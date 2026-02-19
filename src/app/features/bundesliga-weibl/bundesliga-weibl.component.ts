import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
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

type RankingRow = {
  team: string;
  played: string;
  wins: number;
  draws: number;
  losses: number;
  goals: string;
  goalDiff: string;
  points: number;
};

type UpcomingMatch = {
  matchNo: number;
  date: string;
  time: string;
  startsAt: Date;
  home: string;
  away: string;
  venue: string;
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
  private readonly cdr = inject(ChangeDetectorRef);
  private intervalId?: ReturnType<typeof setInterval>;

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly livestreamUrl = 'https://www.youtube.com/live/fRTCG2qFpL4?si=UsCJRF0nyxBK3PqC';
  readonly livestreamEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube-nocookie.com/embed/fRTCG2qFpL4',
  );

  readonly nextMatch: UpcomingMatch = {
    matchNo: 120,
    date: '07.03.26',
    time: '14:00 Uhr',
    startsAt: new Date('2026-03-07T14:00:00+01:00'),
    home: 'Wfr. Spandau 04',
    away: 'Uerdinger Schwimmverein 08',
    venue: 'Berlin',
  };

  readonly lastMatch: MatchResult = {
    matchNo: 116,
    date: '14.02.26',
    time: '16:00 Uhr',
    home: 'Eimsbütteler Turnverband',
    away: 'Wfr. Spandau 04',
    venue: 'Hamburg',
    score: '7 : 35',
    periods: '(2:5, 2:11, 3:10, 0:9)',
  };

  readonly rankingTitle = '6 Mannschaften | 3 Punktsystem';
  readonly rankingRows: RankingRow[] = [
    {
      team: 'Wfr. Spandau 04',
      played: '7/10',
      wins: 7,
      draws: 0,
      losses: 0,
      goals: '203:47',
      goalDiff: '+156',
      points: 21,
    },
    {
      team: 'SV Blau-Weiß Bochum',
      played: '6/10',
      wins: 5,
      draws: 0,
      losses: 1,
      goals: '139:50',
      goalDiff: '+89',
      points: 15,
    },
    {
      team: 'SSV Esslingen',
      played: '7/10',
      wins: 4,
      draws: 0,
      losses: 3,
      goals: '89:91',
      goalDiff: '-2',
      points: 11,
    },
    {
      team: 'Eimsbütteler Turnverband',
      played: '6/10',
      wins: 2,
      draws: 0,
      losses: 4,
      goals: '69:125',
      goalDiff: '-56',
      points: 6,
    },
    {
      team: 'SC Chemnitz 1892',
      played: '6/10',
      wins: 1,
      draws: 0,
      losses: 5,
      goals: '48:124',
      goalDiff: '-76',
      points: 4,
    },
    {
      team: 'Uerdinger Schwimmverein 08',
      played: '6/10',
      wins: 0,
      draws: 0,
      losses: 6,
      goals: '41:152',
      goalDiff: '-111',
      points: 0,
    },
  ];

  countdownText = '00d : 00h : 00m : 00s';

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

  ngOnInit(): void {
    this.updateCountdown();
    if (!this.isBrowser) return;

    this.intervalId = setInterval(() => {
      this.updateCountdown();
      this.cdr.markForCheck();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private updateCountdown(): void {
    const now = Date.now();
    const target = this.nextMatch.startsAt.getTime();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    this.countdownText = `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
  }
}
