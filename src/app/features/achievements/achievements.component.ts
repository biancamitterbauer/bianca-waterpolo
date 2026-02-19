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

  readonly kpiChips: string[] = [
    'Nationalteam',
    'Bundesliga (Frauen)',
    'Spandau 04 seit 08/2025',
    'U16/U18 Turniere',
    'Linkshänderin (Role Impact)',
  ];

  readonly proofCards: ProofCard[] = [
    {
      title: 'Nationalteam Einsätze',
      body: 'Kader- und Spielpraxis auf internationalem Niveau, belastbar im Turnierformat.',
      badge: 'Quelle folgt',
    },
    {
      title: 'Internationale Turniere',
      body: 'Teilnahmen in U16/U18-Kontext mit Top-Wettbewerbsdichte und hoher Sichtbarkeit.',
      badge: 'Quelle folgt',
    },
    {
      title: 'Deutsche Wettbewerbe',
      body: 'Einsatz im Umfeld von Meisterschaft und Pokal auf nationalem Top-Level.',
      badge: 'verifiziert / Quelle folgt',
    },
    {
      title: 'Team Titles (Spandau)',
      body: 'Titelumfeld bei Wasserfreunde Spandau 04 als Leistungskontext seit 08/2025.',
      badge: 'Quelle folgt',
    },
    {
      title: 'Rollenstabilität',
      body: 'Stammspielerin im Vereinssystem mit kontinuierlicher Trainings- und Spielverantwortung.',
      badge: 'verifiziert',
    },
    {
      title: 'Sponsor-Relevanz',
      body: 'Klare Proof-Story zwischen Leistung, Teamkultur und medialer Sichtbarkeit.',
      badge: 'Quelle folgt',
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
      sourceLabel: 'eunwp.eu/hrac/3195',
    },
    {
      id: 'spandau-2025-08',
      year: 2025,
      dateLabel: '08/2025',
      category: 'club',
      title: 'Wechsel zu Wasserfreunde Spandau 04 Berlin',
      subtitle: 'Stammspielerin in der Frauen-Bundesliga',
      details: [
        'Seit 08/2025 fester Bestandteil des Bundesliga-Kaders von Wasserfreunde Spandau 04 Berlin.',
        'Regelmäßige Einsätze als Starterin im Frauenbereich.',
      ],
      highlight: true,
      sourceLabel: 'verifiziert',
    },
    {
      id: 'nationalteam-core',
      year: 2025,
      category: 'nationalteam',
      title: 'Nationalteam-Kader und Einsätze',
      subtitle: 'Juniorinnen- und Frauenkontext',
      details: [
        'Einbindung in Nationalteam-Strukturen mit internationaler Wettbewerbserfahrung.',
        'Details zu Einsätzen und Turnierstatistiken werden ergänzt.',
      ],
      sourceLabel: 'Quelle folgt',
    },
    {
      id: 'u18-tournaments',
      year: 2025,
      category: 'youth',
      title: 'U16/U18 Turnierteilnahmen',
      subtitle: 'Nachwuchsleistungssport auf Top-Niveau',
      details: [
        'Mehrere Turnierformate im Nachwuchsbereich (U16/U18) absolviert.',
        'Konkrete Eventliste und Platzierungen werden strukturiert nachgetragen.',
      ],
      sourceLabel: 'Quelle folgt',
    },
    {
      id: 'club-title-context',
      year: 2026,
      category: 'club',
      title: 'Team-Erfolge im Titelumfeld (Spandau 04)',
      subtitle: 'Leistungsumfeld auf Meisterschafts-/Pokalniveau',
      details: [
        'Mitwirkung im Teamkontext eines mehrfach erfolgreichen Frauen-Bundesliga-Standorts.',
        'Titelbezogene Teamdetails werden mit Quellen sukzessive ergänzt.',
      ],
      sourceLabel: 'Quelle folgt',
    },
    {
      id: 'tournament-performance',
      year: 2026,
      category: 'tournament',
      title: 'Turnierperformance national und international',
      subtitle: 'Konstanz im Wettkampfkalender',
      details: [
        'Wettkampfformen mit hoher Intensität über mehrere Spieltage.',
        'Ergebnisnachweise und Match-Summaries werden fortlaufend ergänzt.',
      ],
      sourceLabel: 'Quelle folgt',
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

  readonly filteredAchievements = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') return this.achievements;
    return this.achievements.filter((item) => item.category === filter);
  });

  readonly timelineGroups = computed(() => {
    const grouped = new Map<number, Achievement[]>();

    for (const item of this.filteredAchievements()) {
      const list = grouped.get(item.year) ?? [];
      list.push(item);
      grouped.set(item.year, list);
    }

    return [...grouped.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, items]) => ({ year, items }));
  });

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

  setFilter(filter: FilterKey): void {
    this.selectedFilter.set(filter);
  }
}
