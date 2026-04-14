import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss',
})
export class ImpressumComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateSeo({
      title: 'Impressum | Bianca Mitterbauer',
      description:
        'Impressum der Website biancamitterbauer.de gemäß § 5 DDG und § 18 Abs. 2 MStV.',
      url: 'https://biancamitterbauer.de/impressum',
      canonical: 'https://biancamitterbauer.de/impressum',
    });
  }
}
