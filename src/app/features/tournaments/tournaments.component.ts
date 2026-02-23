import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';

interface Fixture {
  id: number;
  dateISO: string;
  time: string;
  home: string;
  away: string;
  location: string;
  isSpandau: boolean;
  score?: string;
  scoreDetails?: string;
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

type TopScorerRow = {
  rank: string;
  player: string;
  team: string;
  goals: number;
  matches: number;
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
const TOURNAMENT_VENUE = 'Hamburg';
const RANKING_TEAMS: string[] = [
  'Eimsbütteler Turnverband',
  'SC Chemnitz 1892',
  'SSV Esslingen',
  'Uerdinger Schwimmverein 08',
  'Wfr. Spandau 04',
];

const TOP_SCORERS: TopScorerRow[] = [
  { rank: '1', player: 'Reutter, Mia (2008)', team: 'SSV Esslingen', goals: 24, matches: 4 },
  { rank: '', player: 'Schafft, Maite (2009)', team: 'SSV Esslingen', goals: 24, matches: 4 },
  { rank: '3', player: 'Mitterbauer, Bianca (2009)', team: 'Wfr. Spandau 04', goals: 20, matches: 3 },
  { rank: '4', player: 'Tomica, Viktoria Maria (2008)', team: 'SSV Esslingen', goals: 17, matches: 4 },
  { rank: '5', player: 'Bluhm, Amaia Milena (2009)', team: 'Eimsbütteler Turnverband', goals: 14, matches: 4 },
  { rank: '6', player: 'Bruns, Lina Henriette (2011)', team: 'Wfr. Spandau 04', goals: 13, matches: 4 },
  { rank: '7', player: 'Staffe, Merle Petra (2008)', team: 'SC Chemnitz 1892', goals: 12, matches: 4 },
  { rank: '8', player: 'Fehmel, Emma (2009)', team: 'SC Chemnitz 1892', goals: 11, matches: 4 },
  { rank: '', player: 'Kaya, Elizan Liya Mavi (2010)', team: 'Uerdinger Schwimmverein 08', goals: 11, matches: 4 },
  { rank: '10', player: 'Politze, Nele (2008)', team: 'Wfr. Spandau 04', goals: 10, matches: 4 },
  { rank: '', player: 'Stüven, Mila Marie (2012)', team: 'Eimsbütteler Turnverband', goals: 10, matches: 4 },
  { rank: '12', player: 'Augustynowicz, Kaja (2008)', team: 'Eimsbütteler Turnverband', goals: 9, matches: 4 },
  { rank: '', player: 'Dietze, Emma (2008)', team: 'Eimsbütteler Turnverband', goals: 9, matches: 4 },
  { rank: '', player: 'Frisch, Mia (2009)', team: 'SC Chemnitz 1892', goals: 9, matches: 4 },
  { rank: '', player: 'Lucas, Lina (2010)', team: 'SC Chemnitz 1892', goals: 9, matches: 4 },
  { rank: '16', player: 'Celen, Cemile Cu (2010)', team: 'Uerdinger Schwimmverein 08', goals: 8, matches: 4 },
  { rank: '', player: 'Straach, Clara Marie (2008)', team: 'SC Chemnitz 1892', goals: 8, matches: 4 },
  { rank: '18', player: 'Dimanshteyn, Sofia (2009)', team: 'SSV Esslingen', goals: 7, matches: 3 },
  { rank: '19', player: 'Nolte, Marta (2009)', team: 'Uerdinger Schwimmverein 08', goals: 7, matches: 4 },
  { rank: '', player: 'Schüßler, Lucy (2008)', team: 'SC Chemnitz 1892', goals: 7, matches: 4 },
  { rank: '21', player: 'Gronih, Iva (2009)', team: 'SSV Esslingen', goals: 6, matches: 4 },
  { rank: '', player: 'Hüsselmann, Maya (2008)', team: 'SSV Esslingen', goals: 6, matches: 4 },
  { rank: '', player: 'Mühlmann, Julika (2012)', team: 'Wfr. Spandau 04', goals: 6, matches: 4 },
  { rank: '24', player: 'Dohle, Finja (2008)', team: 'Uerdinger Schwimmverein 08', goals: 5, matches: 4 },
  { rank: '', player: 'Schweingel, Sophia Marie (2009)', team: 'Eimsbütteler Turnverband', goals: 5, matches: 4 },
  { rank: '', player: 'Simic, Helena (2009)', team: 'Uerdinger Schwimmverein 08', goals: 5, matches: 4 },
  { rank: '27', player: 'Kurmakaieva, Alika (2008)', team: 'SSV Esslingen', goals: 4, matches: 4 },
  { rank: '', player: 'Radloff, Lilli Malia (2012)', team: 'Wfr. Spandau 04', goals: 4, matches: 4 },
  { rank: '29', player: 'Arabatzis, Sophia (2010)', team: 'Uerdinger Schwimmverein 08', goals: 3, matches: 4 },
  { rank: '', player: 'Günther, Zoe (2012)', team: 'Wfr. Spandau 04', goals: 3, matches: 4 },
  { rank: '', player: 'Pauels, Ella (2011)', team: 'Uerdinger Schwimmverein 08', goals: 3, matches: 4 },
  { rank: '', player: 'Seeck, Alma Elisa (2010)', team: 'SC Chemnitz 1892', goals: 3, matches: 4 },
  { rank: '', player: 'von Waldenfels, Milla (2011)', team: 'Eimsbütteler Turnverband', goals: 3, matches: 4 },
  { rank: '34', player: 'Augustynowicz, Paula (2011)', team: 'Eimsbütteler Turnverband', goals: 2, matches: 4 },
  { rank: '', player: 'Hahn, Sibel (2009)', team: 'SC Chemnitz 1892', goals: 2, matches: 4 },
  { rank: '', player: 'Häntsch, Jordan Isabella (2012)', team: 'Wfr. Spandau 04', goals: 2, matches: 4 },
  { rank: '', player: 'Netseplyayeva, Eva (2011)', team: 'Wfr. Spandau 04', goals: 2, matches: 4 },
  { rank: '', player: 'Politze, Anouk Eleni (2009)', team: 'Wfr. Spandau 04', goals: 2, matches: 4 },
  { rank: '', player: 'Schlüse, Mara (2011)', team: 'Eimsbütteler Turnverband', goals: 2, matches: 4 },
  { rank: '40', player: 'Lindow, Janne (2010)', team: 'Eimsbütteler Turnverband', goals: 1, matches: 4 },
  { rank: '', player: 'Neufeld, Laura (2011)', team: 'Wfr. Spandau 04', goals: 1, matches: 4 },
  { rank: '', player: 'Pajonk, Caro Lina (2012)', team: 'Uerdinger Schwimmverein 08', goals: 1, matches: 4 },
  { rank: '', player: 'Reutter, Ella Marlene (2011)', team: 'SSV Esslingen', goals: 1, matches: 4 },
  { rank: '', player: 'Skorykow, Lena (2008)', team: 'SSV Esslingen', goals: 1, matches: 4 },
  { rank: '', player: 'Spedicato, Vittoria (2011)', team: 'SSV Esslingen', goals: 1, matches: 4 },
];

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
    score: '10:17',
    scoreDetails: '(1:2, 1:5, 4:5, 4:5)',
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
    score: '18:21',
    scoreDetails: '(8:3, 4:7, 4:5, 2:6)',
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
    score: '5:25',
    scoreDetails: '(0:6, 0:6, 2:6, 3:7)',
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
    score: '9:19',
    scoreDetails: '(1:7, 3:4, 1:4, 4:4)',
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
    score: '28:10',
    scoreDetails: '(8:1, 4:1, 9:2, 7:6)',
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
    score: '16:15',
    scoreDetails: '(5:5, 5:4, 5:3, 1:3)',
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
    score: '23:11',
    scoreDetails: '(6:1, 7:2, 4:4, 6:4)',
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
    score: '11:19',
    scoreDetails: '(2:8, 4:3, 2:5, 3:3)',
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
    score: '22:13',
    scoreDetails: '(9:2, 5:7, 3:1, 5:3)',
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
    score: '6:15',
    scoreDetails: '(0:5, 4:1, 0:6, 2:3)',
  },
];

const TOURNAMENT_META: TournamentMeta = {
  title: 'Deutscher Wasserball Pokal weiblich U18',
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
  private readonly cdr = inject(ChangeDetectorRef);
  private intervalId?: ReturnType<typeof setInterval>;
  private readonly notifiedLiveIds = new Set<number>();

  readonly isBrowser = isPlatformBrowser(this.platformId);
  readonly tournament = TOURNAMENT_META;
  readonly matchDays: MatchDayLabel[] = ['1. Spieltag', '2. Spieltag'];

  selectedMatchDay: MatchDayLabel = '1. Spieltag';
  now = new Date();
  fixtures: FixtureView[] = [];
  nextMatch: FixtureView | null = null;
  rankingTable: RankingRow[] = [];
  readonly topScorers: TopScorerRow[] = TOP_SCORERS;
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

  get rankingTitle(): string {
    return 'Tabelle: 5 Mannschaften | 3 Punktsystem';
  }

  get topScorersTitle(): string {
    return '45 Torjäger | alle Gruppen und Runden | ohne Entscheidungswerfen';
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

  formatGoals(row: RankingRow): string {
    return `${row.goalsFor}:${row.goalsAgainst}`;
  }

  formatGoalDiff(value: number): string {
    return value > 0 ? `+${value}` : `${value}`;
  }

  formatPlayed(row: RankingRow): string {
    const maxGames = 4;
    return `${row.played}/${maxGames}`;
  }

  rankingPlace(index: number): string {
    return String(index + 1);
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
    for (const team of RANKING_TEAMS) {
      table.set(team, {
        team,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0,
      });
    }

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

      if (right.goalsFor !== left.goalsFor) {
        return right.goalsFor - left.goalsFor;
      }

      return left.team.localeCompare(right.team, 'de');
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
