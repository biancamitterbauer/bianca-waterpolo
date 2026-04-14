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

type PlayoffGame = {
  no: number;
  date: string;
  time: string;
  home: string;
  away: string;
  venue: string;
  score?: string;
  periods?: string;
};

type PlayoffGroup = {
  title: string;
  matchup: string;
  status?: string;
  games: PlayoffGame[];
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
  readonly livestreamUrl = 'https://www.youtube.com/watch?v=6XsQm3g34Rc';
  readonly livestreamEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube-nocookie.com/embed/6XsQm3g34Rc',
  );

  readonly nextMatch: UpcomingMatch = {
    matchNo: 203,
    date: '10.05.26',
    time: '14:00 Uhr',
    startsAt: new Date('2026-05-10T14:00:00+02:00'),
    home: 'Wfr. Spandau 04',
    away: 'SC Chemnitz 1892',
    venue: 'Berlin (Playoff-Halbfinale Spiel 2)',
  };

  readonly lastMatch: MatchResult = {
    matchNo: 201,
    date: '11.04.26',
    time: '12:00 Uhr',
    home: 'SC Chemnitz 1892',
    away: 'Wfr. Spandau 04',
    venue: 'Chemnitz (Playoff-Halbfinale Spiel 1)',
    score: '9 : 25',
    periods: '(1:4, 3:4, 2:11, 3:6)',
  };

  readonly playoffGroups: PlayoffGroup[] = [
    {
      title: 'Halbfinale (Best of 3)',
      matchup: 'SC Chemnitz 1892 vs. Wfr. Spandau 04',
      status: 'aktueller Stand: 0:1',
      games: [
        {
          no: 201,
          date: '11.04.26',
          time: '12:00 Uhr',
          home: 'SC Chemnitz 1892',
          away: 'Wfr. Spandau 04',
          venue: 'Chemnitz',
          score: '9 : 25',
          periods: '(1:4, 3:4, 2:11, 3:6)',
        },
        {
          no: 203,
          date: '10.05.26',
          time: '14:00 Uhr',
          home: 'Wfr. Spandau 04',
          away: 'SC Chemnitz 1892',
          venue: 'Berlin',
        },
        {
          no: 205,
          date: 'Termin offen',
          time: '',
          home: 'Wfr. Spandau 04',
          away: 'SC Chemnitz 1892',
          venue: 'Berlin',
        },
      ],
    },
    {
      title: 'Halbfinale (Best of 3)',
      matchup: 'SSV Esslingen vs. SV Blau-Weiß Bochum',
      status: 'aktueller Stand: 0:1',
      games: [
        {
          no: 202,
          date: '11.04.26',
          time: '16:00 Uhr',
          home: 'SSV Esslingen',
          away: 'SV Blau-Weiß Bochum',
          venue: 'Stuttgart',
          score: '9 : 21',
          periods: '(1:5, 2:6, 3:5, 3:5)',
        },
        {
          no: 204,
          date: '09.05.26',
          time: 'Uhrzeit offen',
          home: 'SV Blau-Weiß Bochum',
          away: 'SSV Esslingen',
          venue: 'Bochum',
        },
        {
          no: 206,
          date: '10.05.26',
          time: 'Uhrzeit offen',
          home: 'SV Blau-Weiß Bochum',
          away: 'SSV Esslingen',
          venue: 'Bochum',
        },
      ],
    },
    {
      title: 'Spiel um Platz 5 (Best of 3)',
      matchup: 'Uerdinger Schwimmverein 08 vs. Eimsbütteler Turnverband',
      games: [
        {
          no: 207,
          date: '16.05.26',
          time: '16:00 Uhr',
          home: 'Uerdinger Schwimmverein 08',
          away: 'Eimsbütteler Turnverband',
          venue: 'Krefeld-Uerdingen',
        },
        {
          no: 210,
          date: '23.05.26',
          time: 'Uhrzeit offen',
          home: 'Eimsbütteler Turnverband',
          away: 'Uerdinger Schwimmverein 08',
          venue: 'Hamburg',
        },
        {
          no: 213,
          date: '24.05.26',
          time: 'Uhrzeit offen',
          home: 'Eimsbütteler Turnverband',
          away: 'Uerdinger Schwimmverein 08',
          venue: 'Hamburg',
        },
      ],
    },
  ];

  readonly rankingTitle = 'Endstand Hauptrunde | 6 Mannschaften | 3 Punktsystem';
  readonly rankingRows: RankingRow[] = [
    {
      team: 'Wfr. Spandau 04',
      played: '10/10',
      wins: 10,
      draws: 0,
      losses: 0,
      goals: '275:73',
      goalDiff: '+202',
      points: 30,
    },
    {
      team: 'SV Blau-Weiß Bochum',
      played: '10/10',
      wins: 8,
      draws: 0,
      losses: 2,
      goals: '213:89',
      goalDiff: '+124',
      points: 24,
    },
    {
      team: 'SSV Esslingen',
      played: '10/10',
      wins: 6,
      draws: 0,
      losses: 4,
      goals: '126:127',
      goalDiff: '-1',
      points: 17,
    },
    {
      team: 'SC Chemnitz 1892',
      played: '10/10',
      wins: 3,
      draws: 0,
      losses: 7,
      goals: '79:191',
      goalDiff: '-112',
      points: 9,
    },
    {
      team: 'Eimsbütteler Turnverband',
      played: '10/10',
      wins: 2,
      draws: 0,
      losses: 8,
      goals: '109:185',
      goalDiff: '-76',
      points: 7,
    },
    {
      team: 'Uerdinger Schwimmverein 08',
      played: '10/10',
      wins: 1,
      draws: 0,
      losses: 9,
      goals: '82:219',
      goalDiff: '-137',
      points: 3,
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
