import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
import { InstallService } from '../../core/pwa/install.service';
import { InstallModalComponent } from '../../core/pwa/install-modal/install-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, InstallModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('portrait', { static: true }) portrait?: ElementRef<HTMLImageElement>;
  private portraitObserver?: IntersectionObserver;
  private readonly seo = inject(SeoService);
  readonly installService = inject(InstallService);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  isStandalone = false;
  canPrompt = false;
  isIosPlatform = false;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  install(): void {
    if (!this.isBrowser) return;
    if (this.isStandalone) return;

    if (this.canPrompt) {
      this.installService.promptInstall();
      return;
    }

    if (this.isIosPlatform) {
      this.installService.openModal();
      return;
    }
  }

  

  ngAfterViewInit(): void {
    const portraitElement = this.portrait?.nativeElement;
    if (!portraitElement) {
      return;
    }

    const revealPortrait = () => portraitElement.classList.add('in-view');

    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      revealPortrait();
      return;
    }

    this.portraitObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealPortrait();
          this.portraitObserver?.disconnect();
        }
      });
    }, { threshold: 0.35 });

    this.portraitObserver.observe(portraitElement);
  }

  ngOnDestroy(): void {
    this.portraitObserver?.disconnect();
  }
  ngAfterContentInit(): void {
    // keep for potential future use
  }

  // merge install-related init into single ngOnInit above
  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Bianca Mitterbauer | Wasserballer – Startseite',
      description: 'Offizielle Website von Bianca Mitterbauer. Erfolge, Training, Turniere und Partnerschaften der deutschen Wasserball Nationalspielerin.',
      image: 'https://biancamitterbauer.de/assets/images/logos/background2.png',
      url: 'https://biancamitterbauer.de',
      canonical: 'https://biancamitterbauer.de'
    });

    this.isStandalone = this.installService.isInStandaloneMode();
    this.canPrompt = this.installService.canPromptInstall();
    this.isIosPlatform = this.installService.isIos();
  }
}
