import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';

type MediaChannel = {
  id: string;
  logoSrc: string;
  logoAlt: string;
  type: string;
  title: string;
  meta: string;
  ctaLabel: string;
  href: string;
};

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaComponent {
  private readonly seo = inject(SeoService);

  readonly channels: MediaChannel[] = [
    {
      id: 'spandau-youtube',
      logoSrc: 'assets/images/logos/logo_wfs.png',
      logoAlt: 'Logo Wasserfreunde Spandau 04',
      type: 'Club Channel · YouTube',
      title: 'Wasserfreunde Spandau 04',
      meta: 'Livestreams, Behind-the-Scenes & ca. 5.000+ Abonnenten',
      ctaLabel: 'Zum Kanal',
      href: 'https://www.youtube.com/@WfS04',
    },
    {
      id: 'wa-youtube',
      logoSrc: 'assets/images/logos/logo_wa.png',
      logoAlt: 'Logo World Aquatics',
      type: 'International Federation · YouTube',
      title: 'World Aquatics',
      meta: 'Globale Events & ca. 260.000+ Abonnenten',
      ctaLabel: 'Zum Kanal',
      href: 'https://www.youtube.com/@WorldAquatics',
    },
    {
      id: 'ea-youtube',
      logoSrc: 'assets/images/logos/logo_ea.png',
      logoAlt: 'Logo European Aquatics',
      type: 'European Federation · YouTube',
      title: 'European Aquatics',
      meta: 'Events, Highlights & ca. 85.000+ Abonnenten',
      ctaLabel: 'Zum Kanal',
      href: 'https://www.youtube.com/@EuropeanAquatics',
    },
    {
      id: 'czech-youtube',
      logoSrc: 'assets/images/logos/logo_cz.png',
      logoAlt: 'Logo Czech Water Polo',
      type: 'Regional Hub · YouTube',
      title: 'Czech Water Polo',
      meta: 'Livestreams & ca. 2.000+ Abonnenten',
      ctaLabel: 'Zum Kanal',
      href: 'https://www.youtube.com/@czechwaterpolo',
    },
    {
      id: 'wa-live',
      logoSrc: 'assets/images/logos/logo_wa.png',
      logoAlt: 'Logo World Aquatics',
      type: 'Verbandsplattform · Livestream',
      title: 'World Aquatics Live',
      meta: 'Offizielle Livestreams & Replays internationaler Turniere',
      ctaLabel: 'Zur Plattform',
      href: 'https://www.worldaquatics.com/watch',
    },
    {
      id: 'ea-live',
      logoSrc: 'assets/images/logos/logo_ea.png',
      logoAlt: 'Logo European Aquatics',
      type: 'Verbandsplattform · Events',
      title: 'European Aquatics Live',
      meta: 'LEN Eventstreams, Highlight-Coverage & Reports',
      ctaLabel: 'Zu European Aquatics',
      href: 'https://www.len.eu/',
    },
    {
      id: 'dsv',
      logoSrc: 'assets/images/logos/logo_dsv.png',
      logoAlt: 'Logo Deutscher Schwimmverband',
      type: 'Nationalverband · Deutschland',
      title: 'DSV – Deutscher Schwimmverband',
      meta: 'Bundesweite Wasserball-Coverage & Turnierberichte',
      ctaLabel: 'Zum DSV',
      href: 'https://www.dsv.de/wasserball/',
    },
    {
      id: 'rbb',
      logoSrc: 'assets/images/logos/logo_rbb.png',
      logoAlt: 'Logo Rundfunk Berlin-Brandenburg',
      type: 'Regionale Berichterstattung',
      title: 'rbb · TV & Online',
      meta: 'Redaktionelle Beiträge & Interviews im öffentlich-rechtlichen Umfeld',
      ctaLabel: 'Zum Beispielartikel',
      href: 'https://www.rbb24.de/sport/beitrag/2025/06/wasserball-frauen-spandau-04-deutscher-meister-bochum.html',
    },
  ];

  constructor() {
    this.seo.updateSeo({
      title: 'Media | Bianca Mitterbauer',
      description:
        'Medien- und Distributionskanäle rund um Bianca Mitterbauer: Verbände, Livestream-Plattformen und redaktionelle Coverage.',
      image: 'https://biancamitterbauer.de/assets/images/logos/logo_wa.png',
      url: 'https://biancamitterbauer.de/media',
      canonical: 'https://biancamitterbauer.de/media',
    });
  }
}
