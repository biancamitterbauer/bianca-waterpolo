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
