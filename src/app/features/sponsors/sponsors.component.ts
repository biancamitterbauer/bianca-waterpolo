import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="site-container sponsors-section">
      <h1>Sponsoren & Partner</h1>
      <p>Diese Seite ist derzeit in Entwicklung. Informationen zu Sponsoring-Möglichkeiten finden Sie auf der <a href="/sponsor-pitch">Sponsor-Pitch Seite</a>.</p>
    </section>
  `,
  styles: [`
    .sponsors-section {
      padding: 4rem 2rem;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.1rem;
      max-width: 60ch;
      margin: 0 auto;
    }
    a {
      color: var(--color-accent-red, #f05454);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class SponsorsComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Sponsoren & Partner | Bianca Mitterbauer',
      description: 'Werden Sie Partner von Bianca Mitterbauer. Reichweite, Sichtbarkeit und authentisches Sportmarketing im Wasserball.',
      image: 'https://biancamitterbauer.de/assets/images/logos/background2.png',
      url: 'https://biancamitterbauer.de/sponsors',
      canonical: 'https://biancamitterbauer.de/sponsors'
    });
  }
}
