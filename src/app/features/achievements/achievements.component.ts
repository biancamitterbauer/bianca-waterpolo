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
      id: 'u16-em-2025-ger-cro',
      year: 2025,
      dateLabel: '07/2025',
      category: 'nationalteam',
      title: 'U16 Europameisterschaft 2025',
      subtitle: 'Klassifikationsspiel: Deutschland 13:9 Kroatien (Platz 7)',
      details: [
        'Match 41 (Classification 7-8), 03.07.2025: Deutschland gewinnt mit 13:9 gegen Kroatien.',
        'Anpfiff: 03.07.2025, 15:30 Uhr (lokale Zeit).',
        'Durch den Sieg im Spiel 7/8 beendet Deutschland das Turnier auf Platz 7.',
        'Viertelergebnisse: 4:2, 2:1, 6:5, 1:1.',
        'Schiedsrichter: R. Grillo (ITA) und N. Sajben (HUN).',
        'Bianca Mitterbauer erzielt 2 Tore in der Partie.',
      ],
      sourceLabel:
        'https://results.microplustimingservices.com/ewpcU16w25/#/match-details/results/ASF/1/D81/1/GER/CRO/U16W',
    },
    {
      id: 'u16-em-2025-tur-ger',
      year: 2025,
      dateLabel: '07/2025',
      category: 'nationalteam',
      title: 'U16 Europameisterschaft 2025',
      subtitle: 'Klassifikationsspiel: Türkei 10:7 Deutschland',
      details: [
        'Match 36 (Classification 5-8), 02.07.2025, 16:00 Uhr: Türkei gewinnt mit 10:7 gegen Deutschland.',
        'Viertelergebnisse: 2:0, 3:2, 4:3, 1:2.',
        'Bianca Mitterbauer erzielt 2 Tore in der Partie.',
        'Schiedsrichter: R. Grillo (ITA) und M. Fernandez (ESP).',
      ],
      sourceLabel:
        'https://results.microplustimingservices.com/ewpcU16w25/#/match-details/results/ASF/1/C71/1/TUR/GER/U16W',
    },
    {
      id: 'u16-em-2025-ger-ukr',
      year: 2025,
      dateLabel: '06/2025',
      category: 'nationalteam',
      title: 'U16 Europameisterschaft 2025',
      subtitle: 'Crossovers Match 25: Deutschland 15:8 Ukraine',
      details: [
        'Crossovers Match 25, 30.06.2025, 19:30 Uhr: Deutschland gewinnt mit 15:8 gegen die Ukraine.',
        'Viertelergebnisse: 1:1, 6:4, 3:1, 5:2.',
        'Bianca Mitterbauer erzielt 3 Tore (inkl. 2/3 Strafwürfe) und 1 Ausschluss verursacht.',
        'Schiedsrichter: S. Kontek (CRO) und B. Gunkut (TUR).',
      ],
      sourceLabel:
        'https://results.microplustimingservices.com/ewpcU16w25/#/match-details/results/ASF/1/A51/4/GER/UKR/U16W',
    },
    {
      id: 'u16-em-2025-hun-ger',
      year: 2025,
      dateLabel: '07/2025',
      category: 'nationalteam',
      title: 'U16 Europameisterschaft 2025',
      subtitle: 'Viertelfinale Match 32: Ungarn 14:6 Deutschland',
      details: [
        'Quarter-finals Match 32, 01.07.2025, 20:30 Uhr: Ungarn gewinnt mit 14:6 gegen Deutschland.',
        'Viertelergebnisse: 1:1, 6:2, 6:2, 1:1.',
        'Bianca Mitterbauer: 0 Tore (0/1 Strafwurf), 2 Ausschlüsse verursacht.',
        'Schiedsrichter: E. Kolar (SVK) und N. Mercieca (MLT).',
      ],
      sourceLabel:
        'https://results.microplustimingservices.com/ewpcU16w25/#/match-details/results/ASF/1/A61/2/HUN/GER/U16W',
    },
    {
      id: 'u16-em-2025-gre-ger',
      year: 2025,
      dateLabel: '06/2025',
      category: 'nationalteam',
      title: 'U16 Europameisterschaft 2025',
      subtitle: 'Gruppenphase Gruppe B: Griechenland 26:4 Deutschland',
      details: [
        'Group Stage Group B, 29.06.2025, 13:00 Uhr: Griechenland gewinnt mit 26:4 gegen Deutschland.',
        'Viertelergebnisse: 6:0, 6:2, 8:2, 6:0.',
        'Bianca Mitterbauer ohne Torerfolg in der Partie.',
        'Schiedsrichter: R. Evers (NED) und P. Georgescu (ROU).',
      ],
      sourceLabel:
        'https://results.microplustimingservices.com/ewpcU16w25/#/match-details/results/ASF/1/A01/2/GRE/GER/U16W',
    },
    {
      id: 'u16-em-2025-ita-ger',
      year: 2025,
      dateLabel: '06/2025',
      category: 'nationalteam',
      title: 'U16 Europameisterschaft 2025',
      subtitle: 'Gruppenphase Gruppe B: Italien 21:5 Deutschland',
      details: [
        'Group Stage Group B, 27.06.2025, 19:00 Uhr: Italien gewinnt mit 21:5 gegen Deutschland.',
        'Viertelergebnisse: 4:0, 8:0, 3:5, 6:0.',
        'Bianca Mitterbauer erzielt 3 Tore in der Partie.',
        'Schiedsrichter: B. Beljin (SRB) und N. Mercieca (MLT).',
      ],
      sourceLabel:
        'https://results.microplustimingservices.com/ewpcU16w25/#/match-details/results/ASF/1/A01/2/ITA/GER/U16W',
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
      title: 'European U20 Water Polo Championships 2026',
      subtitle: 'Neue Terminierung durch European Aquatics',
      details: [
        'Austragungsort beider Turniere: Coimbra (Portugal).',
        'Women’s Championships: 03.–09. August 2026.',
        'Men’s Championships: 10.–16. August 2026.',
        'Die Termine wurden nach Kalenderanpassungen von World Aquatics neu festgelegt.',
        'Die Auslosung wurde von November 2025 auf Ende Februar 2026 verschoben.',
      ],
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
