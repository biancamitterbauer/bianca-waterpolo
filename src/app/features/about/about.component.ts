import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly hostRef = inject(ElementRef<HTMLElement>);

  @ViewChild('track', { static: true }) private readonly track?: ElementRef<HTMLElement>;
  @ViewChild('heroPanel') private readonly heroPanel?: ElementRef<HTMLElement>;

  readonly slideIndices = [0, 1, 2] as const;
  readonly activeSlide = signal(0);

  private pendingRaf: number | null = null;
  private heroObserver: ResizeObserver | null = null;
  private readonly onScroll = () => {
    if (this.pendingRaf !== null) return;
    if (!isPlatformBrowser(this.platformId)) return;

    this.pendingRaf = window.requestAnimationFrame(() => {
      this.pendingRaf = null;
      this.updateActiveSlideFromScroll();
    });
  };

  constructor() {
    this.seo.setMeta({
      title: 'Über Bianca — Bianca Mitterbauer',
      description:
        'Professionelles Spielerprofil und Vita von Bianca Mitterbauer – deutsche Nationalspielerin im Wasserball.',
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.track?.nativeElement;
    if (!el) return;

    el.addEventListener('scroll', this.onScroll, { passive: true });
    this.updateActiveSlideFromScroll();

    this.setupHeroSizing();
  }

  ngOnDestroy(): void {
    const el = this.track?.nativeElement;
    if (el) el.removeEventListener('scroll', this.onScroll);

    if (this.pendingRaf !== null && isPlatformBrowser(this.platformId)) {
      window.cancelAnimationFrame(this.pendingRaf);
      this.pendingRaf = null;
    }

    if (this.heroObserver) {
      this.heroObserver.disconnect();
      this.heroObserver = null;
    }
  }

  private setupHeroSizing(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const panel = this.heroPanel?.nativeElement;
    if (!panel) return;

    const sync = () => {
      const height = Math.max(0, Math.round(panel.getBoundingClientRect().height));
      if (height <= 0) return;
      this.hostRef.nativeElement.style.setProperty('--about-hero-panel-height', `${height}px`);
    };

    // Initial sync after layout.
    window.requestAnimationFrame(sync);

    if (typeof ResizeObserver === 'undefined') return;
    this.heroObserver = new ResizeObserver(() => sync());
    this.heroObserver.observe(panel);
  }

  prevSlide(): void {
    this.goToSlide(Math.max(0, this.activeSlide() - 1));
  }

  nextSlide(): void {
    this.goToSlide(Math.min(this.slideIndices.length - 1, this.activeSlide() + 1));
  }

  goToSlide(index: number): void {
    const el = this.track?.nativeElement;
    if (!el) return;

    const clamped = Math.max(0, Math.min(this.slideIndices.length - 1, index));
    const width = el.clientWidth || window.innerWidth;
    el.scrollTo({ left: clamped * width, behavior: 'smooth' });
    this.activeSlide.set(clamped);
  }

  private updateActiveSlideFromScroll(): void {
    const el = this.track?.nativeElement;
    if (!el) return;

    const width = el.clientWidth || window.innerWidth;
    const rawIndex = width > 0 ? el.scrollLeft / width : 0;
    const rounded = Math.round(rawIndex);
    const clamped = Math.max(0, Math.min(this.slideIndices.length - 1, rounded));
    this.activeSlide.set(clamped);
  }
}
