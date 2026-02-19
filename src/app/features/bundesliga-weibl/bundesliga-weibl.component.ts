import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../core/seo/seo.service';

type MatchResult = {
  matchNo: number;
  date: string;
  time: string;
  home: string;
  away: string;
  venue: string;
  score: string;
  periods: string;
};

@Component({
  selector: 'app-bundesliga-weibl',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bundesliga-weibl.component.html',
  styleUrl: './bundesliga-weibl.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundesligaWeiblComponent {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly livestreamUrl = 'https://www.youtube.com/live/fRTCG2qFpL4?si=UsCJRF0nyxBK3PqC';
  readonly livestreamEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube-nocookie.com/embed/fRTCG2qFpL4',
  );

  readonly lastMatch: MatchResult = {
    matchNo: 116,
    date: '14.02.26',
    time: '16:00 Uhr',
    home: 'Eimsbütteler Turnverband',
    away: 'Wfr. Spandau 04',
    venue: 'Hamburg',
    score: '7:35',
    periods: '(2:5, 2:11, 3:10, 0:9)',
  };

  constructor() {
    this.seo.updateSeo({
      title: 'Bundesliga weibl. | Bianca Mitterbauer',
      description:
        'Bundesliga weiblich: letztes Spiel, Ergebnis und Livestream von Bianca Mitterbauer bei Wasserfreunde Spandau 04.',
      image: 'https://biancamitterbauer.de/assets/images/logos/logo_spandau_04_lang_hell.png',
      url: 'https://biancamitterbauer.de/bundesliga-weibl',
      canonical: 'https://biancamitterbauer.de/bundesliga-weibl',
    });
  }
}
