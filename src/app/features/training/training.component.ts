import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo/seo.service';

type TrainingUpdate = {
  id: string;
  title: string;
  period: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  focus: string[];
  sourceUrl: string;
};

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingComponent {
  private readonly seo = inject(SeoService);

  readonly updates: TrainingUpdate[] = [
    {
      id: 'dsv-camp-california-2026-01',
      title: 'EM-Vorbereitung in Kalifornien',
      period: 'Januar 2026',
      location: 'Long Beach City College, Kalifornien (USA)',
      imageSrc: 'assets/images/instagram/DTZglBBFEMi_4.jpg',
      imageAlt: 'EM-Vorbereitung in Kalifornien – 4. Bild des Instagram-Posts',
      summary:
        'Das deutsche Frauen-Nationalteam startet mit einem intensiven Trainingslager in Long Beach ins neue Jahr und nutzt die Anlage des Long Beach City College für die EM-Vorbereitung.',
      focus: [
        'Intensive EM-Vorbereitung unter professionellen Bedingungen.',
        'Teamfokus auf Spielrhythmus und internationale Wettkampfhärte.',
      ],
      sourceUrl: 'https://www.instagram.com/p/DTZglBBFEMi/?img_index=4',
    },
  ];

  constructor() {
    this.seo.updateSeo({
      title: 'Training | Bianca Mitterbauer',
      description:
        'Trainingsupdates von Bianca Mitterbauer: Einblicke in Lehrgänge, Vorbereitung und internationale Camps.',
      image: 'https://biancamitterbauer.de/assets/images/logos/logo_dsv.png',
      url: 'https://biancamitterbauer.de/training',
      canonical: 'https://biancamitterbauer.de/training',
    });
  }
}
