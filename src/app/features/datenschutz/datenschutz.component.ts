import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.scss',
})
export class DatenschutzComponent {
  private readonly seo = inject(SeoService);
  readonly lastUpdated = '14.04.2026';

  constructor() {
    this.seo.updateSeo({
      title: 'Datenschutzerklärung | Bianca Mitterbauer',
      description:
        'Datenschutzerklärung der Website biancamitterbauer.de – Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
      url: 'https://biancamitterbauer.de/datenschutz',
      canonical: 'https://biancamitterbauer.de/datenschutz',
    });
  }
}
