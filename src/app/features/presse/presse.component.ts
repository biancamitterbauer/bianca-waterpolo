import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

type FactRow = { label: string; value: string };
type CareerEntry = { period: string; text: string };

@Component({
  selector: 'app-presse',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './presse.component.html',
  styleUrl: './presse.component.scss',
})
export class PresseComponent {
  private readonly seo = inject(SeoService);

  readonly facts: FactRow[] = [
    { label: 'Name', value: 'Bianca Mitterbauer' },
    { label: 'Geboren', value: '20. Oktober 2009 in Deutschland' },
    { label: 'Sportart', value: 'Wasserball (Water Polo)' },
    { label: 'Position', value: 'Rechts / Rückraum (Linkshänderin)' },
    { label: 'Verein', value: 'Wasserfreunde Spandau 04 (Berlin), 1. Bundesliga Frauen' },
    { label: 'Nationalmannschaft', value: 'Deutschland – Frauen, U20 und U18' },
    { label: 'Schule', value: 'Poelchau-Schule Berlin – Eliteschule des Sports im Olympiapark' },
    { label: 'Vorherige Stationen', value: 'SV Hildesheim · Waspo 98 Hannover' },
  ];

  readonly careerHighlights: CareerEntry[] = [
    { period: '2025/26', text: 'Stammspielerin Wasserfreunde Spandau 04 – Playoff-Halbfinale' },
    { period: '2025', text: 'U18-EM Malta – Platz 10 mit der deutschen Nationalmannschaft' },
    { period: '2025', text: 'U16-EM – Platz 7 mit der deutschen Nationalmannschaft' },
    { period: '2023', text: 'U15-EM Zagreb mit dem deutschen Nationalteam' },
    { period: 'ab 2020', text: 'Erste Deutsche Meisterschaften in den Altersklassen U12/U14 mit Hildesheim' },
  ];

  constructor() {
    this.seo.updateSeo({
      title: 'Presse | Bianca Mitterbauer',
      description:
        'Pressebereich von Bianca Mitterbauer – Factsheet, Kurzbiografie, Karriere-Highlights und Kontakt für Medienanfragen.',
      url: 'https://biancamitterbauer.de/presse',
      canonical: 'https://biancamitterbauer.de/presse',
    });
  }
}
