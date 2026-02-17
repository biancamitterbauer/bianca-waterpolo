import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('portrait', { static: true }) portrait?: ElementRef<HTMLImageElement>;
  private portraitObserver?: IntersectionObserver;
  private readonly seo = inject(SeoService);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Bianca Mitterbauer | Wasserballer – Startseite',
      description: 'Offizielle Website von Bianca Mitterbauer. Erfolge, Training, Turniere und Partnerschaften der deutschen Wasserball Nationalspielerin.',
      image: 'https://biancamitterbauer.de/assets/images/logos/background2.png',
      url: 'https://biancamitterbauer.de',
      canonical: 'https://biancamitterbauer.de'
    });
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
}
