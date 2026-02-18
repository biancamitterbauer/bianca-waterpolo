import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { I18nPipe } from '../../core/i18n/i18n.pipe';

type SlideCard = {
  titleKey: string;
  bodyKey: string;
};

type ReachHighlight = {
  statKey: string;
  labelKey: string;
  bodyKey: string;
};

type SnapshotItem = {
  labelKey: string;
  valueKey: string;
};

type Slide4Kpi = {
  statKey: string;
  labelKey: string;
};

@Component({
  selector: 'app-sponsor-pitch',
  standalone: true,
  imports: [CommonModule, RouterLink, I18nPipe],
  templateUrl: './sponsor-pitch.component.html',
  styleUrls: ['./sponsor-pitch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorPitchComponent implements AfterViewInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('track')
  set track(value: ElementRef<HTMLElement> | undefined) {
    if (value?.nativeElement === this.trackEl) {
      return;
    }

    this.teardownTrack();

    if (value?.nativeElement) {
      this.initializeTrack(value.nativeElement);
    }
  }

  private trackEl?: HTMLElement;
  private readonly slideCount = 6;
  private readonly scrollListener = () => this.updateActiveFromScroll();
  private resizeObserver?: ResizeObserver;
  private downloadNoticeTimeout: number | null = null;
  private pendingSlideIndex: number | null = 0;
  private isBrowser = false;
  private mobileMediaQuery?: MediaQueryList;
  private standaloneMediaQuery?: MediaQueryList;
  private readonly viewportModeListener = () => this.updateViewportMode();

  protected readonly slideIndices = Array.from({ length: this.slideCount }, (_, index) => index);
  protected readonly activeSlide = signal(0);
  protected readonly guidesOn = signal(false);
  protected readonly downloadNoticeVisible = signal(false);
  protected isMobile = false;

  protected readonly slide2Cards: ReadonlyArray<SlideCard> = [
    {
      titleKey: 'pitch.slide2.cards.presence.title',
      bodyKey: 'pitch.slide2.cards.presence.body',
    },
    {
      titleKey: 'pitch.slide2.cards.audience.title',
      bodyKey: 'pitch.slide2.cards.audience.body',
    },
    {
      titleKey: 'pitch.slide2.cards.discipline.title',
      bodyKey: 'pitch.slide2.cards.discipline.body',
    },
    {
      titleKey: 'pitch.slide2.cards.story.title',
      bodyKey: 'pitch.slide2.cards.story.body',
    },
  ];

  protected readonly slide4Benefits = [
    'pitch.slide4.benefits.association',
    'pitch.slide4.benefits.story',
    'pitch.slide4.benefits.partnership',
  ] as const;

  protected readonly slide4PackageColumns = {
    left: [
      'pitch.slide4.package.left.item1',
      'pitch.slide4.package.left.item2',
      'pitch.slide4.package.left.item3',
    ],
    right: [
      'pitch.slide4.package.right.item1',
      'pitch.slide4.package.right.item2',
      'pitch.slide4.package.right.item3',
    ],
  } as const;

  protected readonly slide4Kpis: ReadonlyArray<Slide4Kpi> = [
    {
      statKey: 'pitch.slide4.kpis.visibility.stat',
      labelKey: 'pitch.slide4.kpis.visibility.label',
    },
    {
      statKey: 'pitch.slide4.kpis.reach.stat',
      labelKey: 'pitch.slide4.kpis.reach.label',
    },
    {
      statKey: 'pitch.slide4.kpis.traffic.stat',
      labelKey: 'pitch.slide4.kpis.traffic.label',
    },
  ];

  protected readonly visibilityChannels = [
    { labelKey: 'pitch.slide3.items.events' },
    { labelKey: 'pitch.slide3.items.social' },
    { labelKey: 'pitch.slide3.items.media' },
  ] as const;

  protected readonly reachHighlights: ReadonlyArray<ReachHighlight> = [
    {
      statKey: 'pitch.slide3.reach.live.stat',
      labelKey: 'pitch.slide3.reach.live.label',
      bodyKey: 'pitch.slide3.reach.live.body',
    },
    {
      statKey: 'pitch.slide3.reach.press.stat',
      labelKey: 'pitch.slide3.reach.press.label',
      bodyKey: 'pitch.slide3.reach.press.body',
    },
    {
      statKey: 'pitch.slide3.reach.social.stat',
      labelKey: 'pitch.slide3.reach.social.label',
      bodyKey: 'pitch.slide3.reach.social.body',
    },
  ];

  protected readonly sponsorSnapshot: ReadonlyArray<SnapshotItem> = [
    {
      labelKey: 'pitch.slide3.infobox.items.touchpoints.label',
      valueKey: 'pitch.slide3.infobox.items.touchpoints.value',
    },
    {
      labelKey: 'pitch.slide3.infobox.items.channels.label',
      valueKey: 'pitch.slide3.infobox.items.channels.value',
    },
    {
      labelKey: 'pitch.slide3.infobox.items.reporting.label',
      valueKey: 'pitch.slide3.infobox.items.reporting.value',
    },
  ];

  protected readonly partnershipModels: ReadonlyArray<SlideCard> = [
    {
      titleKey: 'pitch.slide5.cards.main.title',
      bodyKey: 'pitch.slide5.cards.main.body',
    },
    {
      titleKey: 'pitch.slide5.cards.project.title',
      bodyKey: 'pitch.slide5.cards.project.body',
    },
    {
      titleKey: 'pitch.slide5.cards.junior.title',
      bodyKey: 'pitch.slide5.cards.junior.body',
    },
  ];
  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initializeViewportModeTracking();

    const initialGuides = this.route.snapshot.queryParamMap.get('guides') === '1';
    this.guidesOn.set(initialGuides);

      this.route.queryParamMap
        .pipe(takeUntilDestroyed())
        .subscribe((params) => {
          this.guidesOn.set(params.get('guides') === '1' || this.guidesOn());

          const slideParam = params.get('slide');
          if (slideParam !== null) {
            const parsed = Number(slideParam);
            if (!Number.isNaN(parsed)) {
              this.setSlideFromExternal(parsed);
            }
          } else if (this.trackEl) {
            this.syncScrollPosition();
          }
        });
  }

  protected showDownloadNotice(): void {
    this.downloadNoticeVisible.set(true);
    this.startDownloadNoticeTimer();
  }

  ngAfterViewInit(): void {
    this.resetViewportPosition();
  }

  ngOnDestroy(): void {
    this.teardownViewportModeTracking();
    this.teardownTrack();
    this.clearDownloadNoticeTimer();
  }

  protected prevSlide(): void {
    if (this.isMobile) {
      return;
    }

    this.goToSlide(this.activeSlide() - 1);
  }

  protected nextSlide(): void {
    if (this.isMobile) {
      return;
    }

    this.goToSlide(this.activeSlide() + 1);
  }

  protected goToSlide(index: number, behavior: ScrollBehavior = 'smooth'): void {
    if (this.isMobile) {
      return;
    }

    if (!this.trackEl) {
      return;
    }

    const clampedIndex = Math.min(Math.max(index, 0), this.slideCount - 1);
    this.scrollToIndex(clampedIndex, behavior);
    this.activeSlide.set(clampedIndex);
  }

  @HostListener('window:keydown', ['$event'])
  protected handleKeyNavigation(event: KeyboardEvent): void {
    if (this.isMobile) {
      return;
    }

    if (event.key === 'g' || event.key === 'G') {
      if (!this.isEditableTarget(event.target)) {
        event.preventDefault();
        this.toggleGuides();
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextSlide();
    }
  }

  private updateActiveFromScroll(): void {
    if (this.isMobile) {
      return;
    }

    if (!this.trackEl) {
      return;
    }

    const width = this.trackEl.clientWidth;
    if (!width) {
      return;
    }

    const index = Math.round(this.trackEl.scrollLeft / width);
    this.activeSlide.set(Math.min(Math.max(index, 0), this.slideCount - 1));
  }

  private scrollToIndex(index: number, behavior: ScrollBehavior): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!this.trackEl) {
      return;
    }

    const slides = this.trackEl.querySelectorAll<HTMLElement>('.pitch-slide');
    const target = slides.item(index);
    if (!target) {
      return;
    }

    const left = Math.round(target.offsetLeft);
    const anyTrack = this.trackEl as any;
    const canScrollTo = typeof anyTrack.scrollTo === 'function';

    if (canScrollTo) {
      anyTrack.scrollTo({ left, behavior });
    } else {
      this.trackEl.scrollLeft = left;
    }
  }

  private syncScrollPosition(): void {
    if (this.isMobile) {
      return;
    }

    this.runAnimation(() => this.scrollToIndex(this.activeSlide(), 'auto'));
  }

  private resetViewportPosition(): void {
    this.runAnimation(() => {
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }

      this.activeSlide.set(0);
      this.pendingSlideIndex = 0;

      if (!this.isMobile) {
        this.scrollToIndex(0, 'auto');
      }
    });
  }

  private initializeTrack(element: HTMLElement): void {
    if (this.isMobile) {
      this.trackEl = undefined;
      return;
    }

    this.trackEl = element;
    this.trackEl.addEventListener('scroll', this.scrollListener, { passive: true });
    this.updateActiveFromScroll();
    this.setupResizeObserver(element);
    this.syncScrollPosition();

    if (this.pendingSlideIndex !== null) {
      const index = this.pendingSlideIndex;
      this.pendingSlideIndex = null;
      this.scrollToIndex(index, 'auto');
      this.activeSlide.set(index);
    }
  }

  private setupResizeObserver(element: HTMLElement): void {
    this.resizeObserver?.disconnect();
    if (typeof ResizeObserver === 'undefined') {
      this.resizeObserver = undefined;
      return;
    }

    this.resizeObserver = new ResizeObserver(() => this.syncScrollPosition());
    this.resizeObserver.observe(element);
  }

  private teardownTrack(): void {
    if (this.trackEl) {
      this.trackEl.removeEventListener('scroll', this.scrollListener);
    }

    this.trackEl = undefined;
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  private initializeViewportModeTracking(): void {
    if (!this.isBrowser || typeof window.matchMedia !== 'function') {
      return;
    }

    this.mobileMediaQuery = window.matchMedia('(max-width: 899px)');
    this.standaloneMediaQuery = window.matchMedia('(display-mode: standalone)');
    this.updateViewportMode();

    this.mobileMediaQuery.addEventListener('change', this.viewportModeListener);
    this.standaloneMediaQuery.addEventListener('change', this.viewportModeListener);
  }

  private teardownViewportModeTracking(): void {
    this.mobileMediaQuery?.removeEventListener('change', this.viewportModeListener);
    this.standaloneMediaQuery?.removeEventListener('change', this.viewportModeListener);
    this.mobileMediaQuery = undefined;
    this.standaloneMediaQuery = undefined;
  }

  private updateViewportMode(): void {
    const nextIsMobile = Boolean(this.mobileMediaQuery?.matches || this.standaloneMediaQuery?.matches);
    if (this.isMobile === nextIsMobile) {
      return;
    }

    this.isMobile = nextIsMobile;

    if (this.isMobile) {
      this.teardownTrack();
      this.pendingSlideIndex = 0;
      this.activeSlide.set(0);
      return;
    }

    this.syncScrollPosition();
  }

  private startDownloadNoticeTimer(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.clearDownloadNoticeTimer();
    this.downloadNoticeTimeout = window.setTimeout(() => {
      this.downloadNoticeVisible.set(false);
      this.downloadNoticeTimeout = null;
    }, 2000);
  }

  private setSlideFromExternal(index: number): void {
    const clamped = this.clampSlideIndex(index);
    if (this.trackEl) {
      this.scrollToIndex(clamped, 'auto');
      this.activeSlide.set(clamped);
      this.pendingSlideIndex = null;
    } else {
      this.pendingSlideIndex = clamped;
    }
  }

  private clampSlideIndex(index: number): number {
    if (!Number.isFinite(index)) {
      return 0;
    }

    return Math.min(Math.max(Math.trunc(index), 0), this.slideCount - 1);
  }

  private clearDownloadNoticeTimer(): void {
    if (this.downloadNoticeTimeout !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.downloadNoticeTimeout);
      this.downloadNoticeTimeout = null;
    }
  }

  private toggleGuides(): void {
    this.guidesOn.update((value) => !value);
  }

  private isEditableTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    const tag = target.tagName?.toLowerCase();
    return tag === 'input' || tag === 'textarea' || target.isContentEditable;
  }

  private runAnimation(callback: FrameRequestCallback): void {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(callback);
      return;
    }

    callback(0);
  }
}
