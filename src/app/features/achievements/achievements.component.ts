import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

type AchievementCategory = 'nationalteam' | 'club' | 'youth' | 'tournament';
type FilterKey = 'all' | AchievementCategory;

interface Achievement {
  id: string;
  year: number;
  dateLabel?: string;
  category: AchievementCategory;
  title: string;
  subtitle?: string;
  details: string[];
  highlight?: boolean;
  goldOutline?: boolean;
  germanAccent?: boolean;
  sourceLabel?: string;
}

type ProofCard = {
  title: string;
  body: string;
  badge: string;
};

type TeamAchievementCard = {
  title: string;
  body: string;
};

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent {
  private readonly seo = inject(SeoService);
  private readonly monthMap: Record<string, number> = {
    januar: 0,
    februar: 1,
    maerz: 2,
    märz: 2,
    april: 3,
    mai: 4,
    juni: 5,
    juli: 6,
    august: 7,
    september: 8,
    oktober: 9,
    november: 10,
    dezember: 11,
  };

  readonly kpiChips: string[] = [
    'Nationalteam',
    'Bundesliga (Frauen)',
    'Spandau 04 seit 08/2025',
    'U16/U18 Turniere',
  ];

  readonly proofCards: ProofCard[] = [
    {
      title: 'Nationalteam Einsätze',
      body: 'Die DSV-Kaderliste führt Bianca im Wasserball-Nationalteam-Kontext und bestätigt die Einbindung auf Leistungsniveau.',
      badge: 'verifiziert · DSV-Kaderliste',
    },
    {
      title: 'Internationale Turniere',
      body: 'Nationaler Kaderstatus als belastbare Grundlage für Einsätze und Nominierungen bei internationalen Turnieren.',
      badge: 'verifiziert · DSV-Kaderliste',
    },
    {
      title: 'Deutsche Wettbewerbe',
      body: 'Einsatz im Umfeld von Meisterschaft und Pokal auf nationalem Top-Level.',
      badge: 'verifiziert / Quelle folgt',
    },
  ];

  readonly achievements: Achievement[] = [
    {
      id: 'youth-2020-titles',
      year: 2020,
      dateLabel: '2020',
      category: 'youth',
      title: 'Frühe Nachwuchserfolge',
      subtitle: 'Turniere und Meisterschaften',
      details: [
        'Platz 1 – Norddeutsche Meisterschaft 2020',
      ],
      sourceLabel: 'Quelle folgt',
    },
    {
      id: 'youth-2021-series',
      year: 2021,
      dateLabel: '2021',
      category: 'youth',
      title: 'Titelserie im Nachwuchsbereich',
      subtitle: 'U12/U14 mixed',
      details: [
        'Platz 1 – Nico Trophy 2021',
        'Platz 1 – Youngster Trophy 2021',
        'Platz 2 – Deutscher Pokal 2021 – U12 mixed',
      ],
      sourceLabel: 'Quelle folgt',
    },
    {
      id: 'season-2020-2021',
      year: 2021,
      dateLabel: 'Saison 2020/2021',
      category: 'youth',
      title: 'Saisonbilanz 2020/2021',
      subtitle: 'U14 mixed / U14 weiblich / U15 Girls',
      details: [
        'Platz 1 – Norddeutsche Meisterschaft 2021 – U14 mixed',
        'Platz 1 – Vorrunde Deutscher Pokal U14 mixed',
        'Platz 1 – Norddeutsche Meisterschaft 2022 – U14 mixed',
        'Platz 1 – Bezirksliga Hannover 2021 – U14 mixed',
        'Platz 3 – Endrunde Deutscher Pokal U14 mixed',
        'Platz 3 – Ländervergleich U14 weibl.',
        'Platz 4 – Stachow Pokal 2022 – U14 mixed',
        'Platz 5 – Čika Pišta Mesaroš Tournament U15 Girls (Serbien)',
        'Platz 5 – Youngster Trophy',
        'Platz 5 – Zwergenpokal 2022',
        'Platz 5 – Norddeutsche Meisterschaft 2021 – U14 mixed',
      ],
      sourceLabel: 'Quelle folgt',
    },
    {
      id: 'season-2021-2022',
      year: 2022,
      dateLabel: 'Saison 2021/2022',
      category: 'youth',
      title: 'Top-Platzierungen auf DM- und Cup-Niveau',
      subtitle: 'U14 / U16 / U17',
      details: [
        'Platz 1 – Deutsche Meisterschaft U14 weibl.',
        'Platz 1 – Norddeutsche Meisterschaft 2023 – U14 mixed',
        'Platz 2 – Deutsche Meisterschaft U17 weibl.',
        'Platz 2 – U16 Nachwuchscup weibl.',
      ],
      sourceLabel: 'Quelle folgt',
    },
    {
      id: 'em-u15-2023',
      year: 2023,
      dateLabel: '06/2023',
      category: 'nationalteam',
      title: 'U15 Europameisterschaft (Zagreb, Kroatien)',
      subtitle: 'Deutschland erreicht das Viertelfinale',
      details: [
        'Day 4 (27.06.2023): Deutschland gewinnt gegen Israel mit 15:9 und zieht ins Viertelfinale ein.',
        'Bianca Mitterbauer erzielt 4 Tore in diesem Spiel.',
        'Viertelfinal-Ansetzung (28.06.2023): Ungarn vs. Deutschland.',
      ],
      sourceLabel: 'https://total-waterpolo.com/u15-european-championships-germany-reaches-quarter-finals/',
    },
    {
      id: 'season-2022-2023',
      year: 2023,
      dateLabel: 'Saison 2022/2023',
      category: 'tournament',
      title: 'Saison 2022/2023',
      subtitle: 'Einträge in Aufbereitung',
      details: ['Ergebnis- und Turnierdetails folgen.'],
      sourceLabel: 'Quelle folgt',
    },
    {
      id: 'wm-u16-2024-manisa',
      year: 2024,
      dateLabel: '07/2024',
      category: 'nationalteam',
      title: 'World Aquatics Women’s U16 Water Polo Championships 2024',
      subtitle: 'WM-Teilnahme mit Deutschland in Manisa (Türkei)',
      details: [
        'Turnierort laut World Aquatics: Manisa, Türkiye.',
        'Turnierzeitraum: 28.06.–04.07.2024.',
        '24 Nationen waren qualifiziert; Deutschland war als europäisches Team im Teilnehmerfeld.',
        'Bianca Mitterbauer nahm mit dem deutschen Team an dieser U16-Weltmeisterschaft teil.',
      ],
      goldOutline: true,
      sourceLabel: 'https://www.worldaquatics.com/competitions/3490/world-aquatics-women-s-u16-water-polo-championships-2024',
    },
    {
      id: 'dsv-kader-verifikation',
      year: 2026,
      dateLabel: '2026',
      category: 'nationalteam',
      title: 'DSV-Kaderliste Wasserball (Verifikation)',
      subtitle: 'Nachweis für Nationalteam-Einsätze und Turnier-Nominierungen',
      details: [
        'Die Kaderliste des Deutschen Schwimm-Verbands führt Bianca Mitterbauer im Wasserball-Kontext.',
        'Der Kaderstatus verifiziert die Einbindung für nationale und internationale Turniere.',
        'Die Einordnung stützt die Darstellung von Nationalteam-Einsätzen auf der Erfolge-Seite.',
      ],
      sourceLabel: 'https://www.dsv.de/de/leistungs--und-wettkampfsport/wasserball/nationalmannschaft/dsv-kader/',
    },
    {
      id: 'eu-nations-cup-2025',
      year: 2025,
      dateLabel: '10/2025 – 11/2025',
      category: 'nationalteam',
      title: 'EU Nations Waterpolo Cup 2025',
      subtitle: 'Teilnahme mit Deutschland (U18-Kontext)',
      details: [
        '3 Spiele beim EU Nations Waterpolo Cup 2025 absolviert.',
        'Gesamtwerte laut Profilübersicht: 12 Schüsse, 3 Tore, 2 Assists.',
        'Spielübersicht: GER–CZE 19:17, SCO–GER 6:24, SWE–GER 14:12.',
        'Korrektur Altersangabe: Bianca war zum Turnierzeitpunkt 16 Jahre alt.',
      ],
      highlight: true,
      goldOutline: true,
      sourceLabel: 'eunwp.eu/hrac/3195',
    },
    {
      id: 'spandau-supercup-2025',
      year: 2025,
      dateLabel: '2025',
      category: 'club',
      title: 'Supercup-Siegerinnen 2025',
      subtitle: 'Wasserfreunde Spandau 04',
      details: [
        'Titelgewinn im Supercup mit einem 15:11-Sieg gegen Blau-Weiß Bochum.',
        'Beitragskontext: Der Pokal bleibt in Berlin.',
      ],
      sourceLabel: 'https://www.instagram.com/p/DP9kv20jI4C/',
    },
    {
      id: 'spandau-deutsche-meisterinnen-2025',
      year: 2025,
      dateLabel: '2025',
      category: 'club',
      title: 'Deutsche Meisterinnen 2025',
      subtitle: 'Titelverteidigung mit perfekter Saison (Spandau 04 Women)',
      details: [
        'Titelverteidigung: Spandau 04 Women sind Deutsche Meisterinnen 2025.',
        'Finalspiel gegen Blau-Weiß Bochum: 15:5 für Spandau.',
        'Finalserie im Modus Best of Three: 2:0 Siege.',
      ],
      germanAccent: true,
      sourceLabel: 'https://www.instagram.com/p/DKVHVHoIQyU/',
    },
    {
      id: 'spandau-neuzugang-2025-05',
      year: 2025,
      dateLabel: '30.05.2025',
      category: 'club',
      title: 'Neuzugang und Wechsel zu Wasserfreunde Spandau 04 Berlin',
      subtitle: 'Offizielle Vorstellung · Vertrag bis 2028',
      details: [
        'Wechsel und offizielle Vorstellung bei den Wasserfreunden Spandau 04 (Women) am 30.05.2025.',
        'Im Beitrag wird eine Vertragslaufzeit bis 2028 genannt.',
        'Leistungsbezug im Posting: internationale Einsätze im U18- und U16-Nationalteam.',
        'Anschluss im Clubkontext: Einsätze als Stammspielerin im Bundesliga-Umfeld von Spandau 04.',
      ],
      highlight: true,
      sourceLabel: 'https://www.instagram.com/p/DKTeRoVomy6/?img_index=1',
    },
    {
      id: 'u16-em-2025-overview',
      year: 2025,
      dateLabel: '06/2025 – 07/2025',
      category: 'nationalteam',
      title: 'U16 Europameisterschaft 2025',
      subtitle: 'Deutschland beendet das Turnier auf Platz 7',
      details: [
        'Turnierverlauf über Gruppenphase, Viertelfinale und Klassifikationsrunde bei der U16-EM 2025.',
        'In der K.-o.- und Klassifikationsphase gelingt ein klarer Sieg gegen die Ukraine (15:8).',
        'Im Spiel um Platz 7 gewinnt Deutschland gegen Kroatien mit 13:9 und schließt das Turnier auf Rang 7 ab.',
        'Bianca Mitterbauer leistet über das Turnier hinweg wiederholt Torbeiträge für das deutsche Team.',
      ],
      sourceLabel: 'https://results.microplustimingservices.com/ewpcU16w25/#/',
    },
    {
      id: 'u18-tournaments',
      year: 2025,
      dateLabel: '09/2025',
      category: 'nationalteam',
      title: 'U18 Europameisterschaft 2025',
      subtitle: 'Platz 10 in Gzira (Malta) mit sehr jungem Team',
      details: [
        'Abschlussplatzierung: Platz 10 bei der U18-EM (September 2025).',
        'Kaderstruktur: Mit einer Ausnahme gehörten alle Spielerinnen den U17- oder U16-Jahrgängen an.',
        'Vorrunde: Siege gegen Ukraine (14:5), Irland (20:7) und Malta (16:10), Niederlage gegen Serbien (9:12).',
        'Überkreuzspiel: knappe 11:12-Niederlage gegen die Niederlande.',
        'Platzierungsspiele: 11:10 gegen Großbritannien, danach 9:14 gegen die Türkei (Spiel um Platz 10).',
        'Top-Scorerinnen Deutschland: Mara Dzaja (23), Lucy Schüssler (13) und Bianca Mitterbauer (13).',
      ],
      sourceLabel:
        'https://germanaquatics.de/dsv-wasserballerinnen-mit-sehr-jungem-team-auf-platz-zehn-bei-der-u18-em/',
    },
    {
      id: 'spandau-cl-hauptrunde-2025',
      year: 2025,
      dateLabel: '09/2025',
      category: 'club',
      title: 'Champions League Hauptrunde erreicht (Women)',
      subtitle: 'Wasserfreunde Spandau 04 · historischer Meilenstein',
      details: [
        'Aussage im Beitrag: Spandau 04 Women qualifizieren sich als erster deutscher Verein für die Hauptrunde der Champions League der Damen.',
        'Beitragskontext: „Geschichte geschrieben“ für den deutschen Frauenwasserball.',
      ],
      highlight: true,
      sourceLabel: 'https://www.instagram.com/p/DPJeW9CiBnA/',
    },
    {
      id: 'spandau-instagram-top-scorer-2026-02',
      year: 2026,
      dateLabel: '18.02.2026',
      category: 'club',
      title: 'Spandau 04 Women · TOP SCORER (Instagram)',
      subtitle: 'Auswärtsspiel-Highlight aus dem Teamkanal',
      details: [
        'Instagram-Post vom 18.02.2026 mit Top-Scorerinnen-Visual aus dem Spandau-Umfeld.',
        'Beitragsaussage: „Viele Schützinnen, eine klare Botschaft: Offensivpower pur auswärts!“',
        'Bianca Mitterbauer wird im Beitrag als Top-Scorerin geführt.',
      ],
      sourceLabel: 'https://www.instagram.com/p/DU5PzL0iIJs/?img_index=2',
    },
    {
      id: 'u18-em-2026-women',
      year: 2026,
      dateLabel: '16.–23.08.2026',
      category: 'nationalteam',
      title: 'Women’s U18 European Championships 2026 (geplant)',
      subtitle: 'Kommendes Turnier · Termin und Austragungsort bestätigt',
      details: [
        'Zukunftsplanung 2026: Teilnahmefenster im internationalen U18-Kalender.',
        'Women’s U18 Championships: 16.–23. August 2026.',
        'Austragungsort: Tenerife Aquatic Sports Centre (CDAT), Puerto de la Cruz.',
      ],
      goldOutline: true,
      sourceLabel: 'European Aquatics (Terminankündigung 2026)',
    },
    {
      id: 'u18-pokal-2026-hamburg',
      year: 2026,
      dateLabel: '21.–22.02.2026',
      category: 'tournament',
      title: 'Deutscher Wasserball Pokal weiblich U18 (geplant)',
      subtitle: 'Hamburg · kommendes Turnier',
      details: [
        'Turniertermin: 21.–22. Februar 2026.',
        'Austragungsort: Hamburg.',
      ],
      goldOutline: true,
      germanAccent: true,
      sourceLabel: 'https://www.dsv.de/de/leistungs--und-wettkampfsport/wasserball/wettkampf/ergebnisse/',
    },
    {
      id: 'tournament-performance',
      year: 2026,
      dateLabel: '03.–16.08.2026',
      category: 'tournament',
      title: 'European U20 Water Polo Championships 2026 (geplant)',
      subtitle: 'Kommendes Turnier · aktualisierte Terminierung',
      details: [
        'Zukunftsplanung 2026: Terminfenster für die U20-Europameisterschaften.',
        'Austragungsort beider Turniere: Coimbra (Portugal).',
        'Women’s Championships: 03.–09. August 2026.',
        'Men’s Championships: 10.–16. August 2026.',
        'Die Termine wurden nach Kalenderanpassungen von World Aquatics neu festgelegt.',
        'Die Auslosung wurde von November 2025 auf Ende Februar 2026 verschoben.',
      ],
      goldOutline: true,
      sourceLabel:
        'https://europeanaquatics.org/new-dates-for-2026-european-u20-water-polo-championships-announced/',
    },
  ];

  readonly teamAchievementCards: TeamAchievementCard[] = [
    {
      title: 'Mehrfacher Deutscher Meister (Teamtitel)',
      body: 'Wasserfreunde Spandau 04 im etablierten Titelumfeld des deutschen Frauen-Wasserballs (u. a.).',
    },
    {
      title: 'Mehrfacher Pokalsieger',
      body: 'Team-Erfolge im DSV-Pokalrahmen mit hoher Wettbewerbsdichte.',
    },
    {
      title: 'Nationale Endrunden & internationale Wettbewerbe',
      body: 'Teilnahmen an nationalen Endrunden und internationalen Wettbewerben als relevantes Leistungsumfeld.',
    },
  ];

  readonly selectedFilter = signal<FilterKey>('all');

  private readonly top2026Order: Record<string, number> = {
    'u18-em-2026-women': 0,
    'tournament-performance': 1,
  };

  readonly filteredAchievements = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') return this.achievements;
    return this.achievements.filter((item) => item.category === filter);
  });

  readonly timelineGroups = computed(() => {
    const sortedItems = [...this.filteredAchievements()].sort(
      (a, b) => {
        const pinnedOrder = this.comparePinned2026Order(a, b);
        if (pinnedOrder !== 0) return pinnedOrder;
        return this.getSortTimestamp(b) - this.getSortTimestamp(a);
      },
    );

    const grouped = new Map<number, Achievement[]>();

    for (const item of sortedItems) {
      const list = grouped.get(item.year) ?? [];
      list.push(item);
      grouped.set(item.year, list);
    }

    return [...grouped.entries()]
      .map(([year, items]) => ({
        year,
        items,
        maxTimestamp: Math.max(...items.map((entry) => this.getSortTimestamp(entry))),
      }))
      .sort((a, b) => b.maxTimestamp - a.maxTimestamp)
      .map(({ year, items }) => ({ year, items }));
  });

  private comparePinned2026Order(a: Achievement, b: Achievement): number {
    if (a.year !== 2026 || b.year !== 2026) return 0;

    const aPinned = this.top2026Order[a.id];
    const bPinned = this.top2026Order[b.id];
    const aHasPin = aPinned !== undefined;
    const bHasPin = bPinned !== undefined;

    if (aHasPin && bHasPin) return aPinned - bPinned;
    if (aHasPin) return -1;
    if (bHasPin) return 1;
    return 0;
  }

  constructor() {
    this.seo.updateSeo({
      title: 'Erfolge | Bianca Mitterbauer',
      description:
        'Erfolge von Bianca Mitterbauer: Nationalteam, Bundesliga bei Wasserfreunde Spandau 04, Turniere und sponsor-relevante Leistungsnachweise.',
      image: 'https://biancamitterbauer.de/assets/images/logos/logo_spandau_04_lang_hell.png',
      url: 'https://biancamitterbauer.de/achievements',
      canonical: 'https://biancamitterbauer.de/achievements',
    });
  }

  isEuroOrWorldChampionship(item: Achievement): boolean {
    const content = `${item.title} ${item.subtitle ?? ''} ${item.details.join(' ')}`.toLowerCase();
    return (
      content.includes('europameisterschaft') ||
      content.includes('european championship') ||
      content.includes('weltmeisterschaft') ||
      content.includes('world championship') ||
      /\bu\d{2}\s*em\b/.test(content) ||
      /\bu\d{2}\s*wm\b/.test(content)
    );
  }

  isSpandauReference(item: Achievement): boolean {
    const content = `${item.title} ${item.subtitle ?? ''} ${item.details.join(' ')}`.toLowerCase();
    return content.includes('spandau');
  }

  private getSortTimestamp(item: Achievement): number {
    const dateLabel = item.dateLabel ?? '';
    const byLabel = this.parseDateLabelToTimestamp(dateLabel);
    if (byLabel !== null) return byLabel;

    const byDetails = this.parseLatestDateFromText(item.details.join(' '));
    if (byDetails !== null) return byDetails;

    return new Date(item.year, 11, 31).getTime();
  }

  private parseDateLabelToTimestamp(label: string): number | null {
    const normalized = label.toLowerCase().trim();

    const monthRange = normalized.match(/(\d{1,2})\/(\d{4})\s*[–-]\s*(\d{1,2})\/(\d{4})/);
    if (monthRange) {
      const endMonth = Number(monthRange[3]) - 1;
      const endYear = Number(monthRange[4]);
      return new Date(endYear, endMonth, 28).getTime();
    }

    const dayRangeNumeric = normalized.match(/(\d{1,2})\.\s*[–-]\s*(\d{1,2})\.(\d{1,2})\.(\d{4})/);
    if (dayRangeNumeric) {
      const endDay = Number(dayRangeNumeric[2]);
      const month = Number(dayRangeNumeric[3]) - 1;
      const year = Number(dayRangeNumeric[4]);
      return new Date(year, month, endDay).getTime();
    }

    const dayRangeNamed = normalized.match(/(\d{1,2})\.\s*[–-]\s*(\d{1,2})\.\s*([a-zäöü]+)\s*(\d{4})/);
    if (dayRangeNamed) {
      const endDay = Number(dayRangeNamed[2]);
      const month = this.monthMap[dayRangeNamed[3]];
      const year = Number(dayRangeNamed[4]);
      if (month !== undefined) return new Date(year, month, endDay).getTime();
    }

    const monthYear = normalized.match(/(\d{1,2})\/(\d{4})/);
    if (monthYear) {
      const month = Number(monthYear[1]) - 1;
      const year = Number(monthYear[2]);
      return new Date(year, month, 28).getTime();
    }

    const season = normalized.match(/saison\s*(\d{4})\/(\d{4})/);
    if (season) {
      const endYear = Number(season[2]);
      return new Date(endYear, 5, 30).getTime();
    }

    const yearOnly = normalized.match(/\b(20\d{2})\b/);
    if (yearOnly) {
      return new Date(Number(yearOnly[1]), 11, 31).getTime();
    }

    return null;
  }

  private parseLatestDateFromText(text: string): number | null {
    const matches = [...text.matchAll(/(\d{1,2})\.(\d{1,2})\.(\d{4})/g)];
    if (matches.length === 0) return null;

    let latest = 0;
    for (const match of matches) {
      const day = Number(match[1]);
      const month = Number(match[2]) - 1;
      const year = Number(match[3]);
      const value = new Date(year, month, day).getTime();
      if (value > latest) latest = value;
    }

    return latest || null;
  }

  setFilter(filter: FilterKey): void {
    this.selectedFilter.set(filter);
  }
}
