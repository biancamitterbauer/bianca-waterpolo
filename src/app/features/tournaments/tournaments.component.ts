import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Fixture {
  id: number;
  dateISO: string;
  time: string;
  home: string;
  away: string;
  location: string;
  isSpandau: boolean;
  score?: string;
  status?: 'upcoming' | 'live' | 'finished';
}

type MatchDayLabel = '1. Spieltag' | '2. Spieltag';

type FixtureView = Fixture & {
  matchDay: MatchDayLabel;
  startsAt: Date;
};

type RankingRow = {
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
};

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type TournamentMeta = {
  title: string;
  subtitle: string;
  location: string;
  status: string;
  objective: string;
  meeting: string;
  ceremony: string;
};

type FixtureSource = Fixture & {
  matchDay: MatchDayLabel;
};

const LIVE_MATCH_DURATION_MINUTES = 120;
const TOURNAMENT_VENUE = 'Am Inselpark, 21109 Hamburg';

const FIXTURE_SOURCE: FixtureSource[] = [
  {
    id: 1,
    matchDay: '1. Spieltag',
    dateISO: '2026-02-21',
    time: '10:00',
    home: 'Uerdinger Schwimmverein 08',
    away: 'SC Chemnitz 1892',
    location: TOURNAMENT_VENUE,
    isSpandau: false,
  },
  {
    id: 2,
    matchDay: '1. Spieltag',
    dateISO: '2026-02-21',
    time: '11:30',
    home: 'Eimsbütteler Turnverband',
    away: 'Wfr. Spandau 04',
    location: TOURNAMENT_VENUE,
    isSpandau: true,
  },
  {
    id: 3,
    matchDay: '1. Spieltag',
    dateISO: '2026-02-21',
    time: '13:30',
    home: 'Uerdinger Schwimmverein 08',
    away: 'SSV Esslingen',
    location: TOURNAMENT_VENUE,
    isSpandau: false,
  },
  {
    id: 4,
    matchDay: '1. Spieltag',
    dateISO: '2026-02-21',
    time: '15:00',
    home: 'Wfr. Spandau 04',
    away: 'SC Chemnitz 1892',
    location: TOURNAMENT_VENUE,
    isSpandau: true,
  },
  {
    id: 5,
    matchDay: '1. Spieltag',
    dateISO: '2026-02-21',
    time: '16:30',
    home: 'SSV Esslingen',
    away: 'Eimsbütteler Turnverband',
    location: TOURNAMENT_VENUE,
    isSpandau: false,
  },
  {
    id: 6,
    matchDay: '2. Spieltag',
    dateISO: '2026-02-22',
    time: '09:00',
    home: 'Eimsbütteler Turnverband',
    away: 'Uerdinger Schwimmverein 08',
    location: TOURNAMENT_VENUE,
    isSpandau: false,
  },
  {
    id: 7,
    matchDay: '2. Spieltag',
    dateISO: '2026-02-22',
    time: '10:30',
    home: 'SSV Esslingen',
    away: 'Wfr. Spandau 04',
    location: TOURNAMENT_VENUE,
    isSpandau: true,
  },
  {
    id: 8,
    matchDay: '2. Spieltag',
    dateISO: '2026-02-22',
    time: '12:00',
    home: 'Eimsbütteler Turnverband',
    away: 'SC Chemnitz 1892',
    location: TOURNAMENT_VENUE,
    isSpandau: false,
  },
  {
    id: 9,
    matchDay: '2. Spieltag',
    dateISO: '2026-02-22',
    time: '13:30',
    home: 'Wfr. Spandau 04',
    away: 'Uerdinger Schwimmverein 08',
    location: TOURNAMENT_VENUE,
    isSpandau: true,
  },
  {
    id: 10,
    matchDay: '2. Spieltag',
    dateISO: '2026-02-22',
    time: '15:00',
    home: 'SC Chemnitz 1892',
    away: 'SSV Esslingen',
    location: TOURNAMENT_VENUE,
    isSpandau: false,
  },
];

const TOURNAMENT_META: TournamentMeta = {
  title: 'DSV U18 Deutschland-Pokal',
  subtitle: 'Hamburg · 21–22 Februar 2026',
  location: TOURNAMENT_VENUE,
  status: '10 Spielansetzungen | 3 Punktsystem',
  objective: 'Kompakter Rundenturnier-Modus mit zwei Spieltagen und klarer Struktur für Team, Medien und Partner.',
  meeting: 'Turnierbesprechung: Do, 19.02.2026 um 19:00 Uhr',
  ceremony: 'Siegerehrung: So, 22.02.2026 um 16:45 Uhr',
};

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentsComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);
  private intervalId?: ReturnType<typeof setInterval>;
  private readonly notifiedLiveIds = new Set<number>();

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly tournament = TOURNAMENT_META;
  readonly matchDays: MatchDayLabel[] = ['1. Spieltag', '2. Spieltag'];
  readonly livestreamChannelUrl = 'https://www.youtube.com/@etvwasserball';
  readonly livestreamEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.youtube-nocookie.com/embed?listType=user_uploads&list=etvwasserball',
  );

  selectedMatchDay: MatchDayLabel = '1. Spieltag';
  now = new Date();
  fixtures: FixtureView[] = [];
  nextMatch: FixtureView | null = null;
  rankingTable: RankingRow[] = [];
  countdown: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  countdownText = '00d : 00h : 00m : 00s';
  isLiveSoon = false;
  isLiveMatch = false;

  get filteredFixtures(): FixtureView[] {
    return this.fixtures.filter((fixture) => fixture.matchDay === this.selectedMatchDay);
  }

  get hasResults(): boolean {
    return this.fixtures.some((fixture) => !!fixture.score);
  }

  get isTournamentOver(): boolean {
    return this.fixtures.length > 0 && !this.nextMatch;
  }

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Turniere | Bianca Mitterbauer',
      description:
        'Full-Width Turnierübersicht mit Match Center, Echtzeit-Countdown, Livestream, Spieltagsnavigation und Ranking für Wasserfreunde Spandau 04.',
      image: 'https://biancamitterbauer.de/assets/images/logos/logo_dsv.png',
      url: 'https://biancamitterbauer.de/tournaments',
      canonical: 'https://biancamitterbauer.de/tournaments',
    });

    this.updateDerivedState();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  selectMatchDay(day: MatchDayLabel): void {
    this.selectedMatchDay = day;
  }

  formatDisplayDate(dateIso: string): string {
    const date = new Date(`${dateIso}T00:00:00`);
    return date.toLocaleDateString('de-DE', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  statusLabel(status: Fixture['status']): string {
    if (status === 'live') {
      return 'LIVE';
    }

    if (status === 'finished') {
      return 'Beendet';
    }

    return 'Upcoming';
  }

  scoreOrStatus(fixture: FixtureView): string {
    if (fixture.score) {
      return fixture.score;
    }

    return this.statusLabel(fixture.status);
  }

  statusClass(status: Fixture['status']): string {
    if (status === 'live') {
      return 'status-badge status-badge--live';
    }

    if (status === 'finished') {
      return 'status-badge status-badge--finished';
    }

    return 'status-badge status-badge--upcoming';
  }

  triggerMatchNotification(fixture: Fixture): void {
    console.log(`Match Live: ${fixture.home} vs ${fixture.away}`);
  }

  startCountdown(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.updateDerivedState();
      this.cdr.markForCheck();
    }, 1000);
  }

  private updateDerivedState(): void {
    this.now = new Date();

    this.fixtures = FIXTURE_SOURCE.map((fixture) => {
      const startsAt = this.toFixtureDate(fixture.dateISO, fixture.time);
      const status = this.resolveStatus(startsAt, this.now);

      return {
        ...fixture,
        startsAt,
        status,
      };
    }).sort((left, right) => left.startsAt.getTime() - right.startsAt.getTime());

    const spandauFixtures = this.fixtures.filter((fixture) => fixture.isSpandau);
    const liveSpandau = spandauFixtures.find((fixture) => fixture.status === 'live') ?? null;
    const upcomingSpandau = spandauFixtures.find((fixture) => fixture.status === 'upcoming') ?? null;

    this.nextMatch = liveSpandau ?? upcomingSpandau;
    this.isLiveMatch = !!liveSpandau;

    if (upcomingSpandau) {
      const msUntilStart = upcomingSpandau.startsAt.getTime() - this.now.getTime();
      this.isLiveSoon = msUntilStart > 0 && msUntilStart <= LIVE_MATCH_DURATION_MINUTES * 60 * 1000;
    } else {
      this.isLiveSoon = false;
    }

    for (const fixture of this.fixtures) {
      if (fixture.status === 'live' && !this.notifiedLiveIds.has(fixture.id)) {
        this.notifiedLiveIds.add(fixture.id);
        this.triggerMatchNotification(fixture);
      }
    }

    this.updateCountdown();
    this.rankingTable = this.calculateRanking(this.fixtures);
  }

  private updateCountdown(): void {
    if (!this.nextMatch) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      this.countdownText = '00d : 00h : 00m : 00s';
      return;
    }

    if (this.nextMatch.status === 'live') {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      this.countdownText = '00d : 00h : 00m : 00s';
      return;
    }

    const difference = this.nextMatch.startsAt.getTime() - this.now.getTime();

    if (difference <= 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      this.countdownText = '00d : 00h : 00m : 00s';
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.countdown = { days, hours, minutes, seconds };
    this.countdownText = `${this.pad2(days)}d : ${this.pad2(hours)}h : ${this.pad2(minutes)}m : ${this.pad2(seconds)}s`;
  }

  private pad2(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private toFixtureDate(dateIso: string, time: string): Date {
    return new Date(`${dateIso}T${time}:00`);
  }

  private resolveStatus(startDate: Date, nowDate: Date): Fixture['status'] {
    const start = startDate.getTime();
    const now = nowDate.getTime();
    const end = start + LIVE_MATCH_DURATION_MINUTES * 60 * 1000;

    if (now >= start && now < end) {
      return 'live';
    }

    if (now >= end) {
      return 'finished';
    }

    return 'upcoming';
  }

  private calculateRanking(fixtures: Fixture[]): RankingRow[] {
    const table = new Map<string, RankingRow>();
    const fixturesWithScore = fixtures.filter((fixture) => !!fixture.score);

    for (const fixture of fixturesWithScore) {
      const parsed = this.parseScore(fixture.score ?? '');

      if (!parsed) {
        continue;
      }

      const homeRow = this.getRankingRow(table, fixture.home);
      const awayRow = this.getRankingRow(table, fixture.away);

      homeRow.played += 1;
      awayRow.played += 1;

      homeRow.goalsFor += parsed.home;
      homeRow.goalsAgainst += parsed.away;
      awayRow.goalsFor += parsed.away;
      awayRow.goalsAgainst += parsed.home;

      if (parsed.home > parsed.away) {
        homeRow.wins += 1;
        awayRow.losses += 1;
        homeRow.points += 3;
      } else if (parsed.home < parsed.away) {
        awayRow.wins += 1;
        homeRow.losses += 1;
        awayRow.points += 3;
      } else {
        homeRow.draws += 1;
        awayRow.draws += 1;
        homeRow.points += 1;
        awayRow.points += 1;
      }
    }

    const rows = Array.from(table.values()).map((row) => ({
      ...row,
      goalDiff: row.goalsFor - row.goalsAgainst,
    }));

    return rows.sort((left, right) => {
      if (right.points !== left.points) {
        return right.points - left.points;
      }

      if (right.goalDiff !== left.goalDiff) {
        return right.goalDiff - left.goalDiff;
      }

      return right.goalsFor - left.goalsFor;
    });
  }

  private parseScore(score: string): { home: number; away: number } | null {
    const [homeRaw, awayRaw] = score.split(':').map((part) => Number(part.trim()));

    if (!Number.isFinite(homeRaw) || !Number.isFinite(awayRaw)) {
      return null;
    }

    return { home: homeRaw, away: awayRaw };
  }

  private getRankingRow(table: Map<string, RankingRow>, team: string): RankingRow {
    const existing = table.get(team);

    if (existing) {
      return existing;
    }

    const row: RankingRow = {
      team,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0,
    };

    table.set(team, row);
    return row;
  }
}
