import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

type TournamentMatch = {
  matchNumber: number;
  matchDay: string;
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  venue: string;
  info: string;
  isSpandauGame: boolean;
};

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentsComponent implements OnInit {
  private readonly seo = inject(SeoService);

  readonly nextTournament = {
    title: 'DSV U18 Deutschland-Pokal',
    period: '21.–22. Februar 2026',
    location: 'Hamburg',
    status: '10 Spielansetzungen | 3 Punktsystem',
    objective: 'Kompakter Rundenturnier-Modus mit zwei Spieltagen und klarer Struktur für Team, Medien und Partner.',
    meeting: 'Turnierbesprechung: Do, 19.02.2026 um 19:00 Uhr',
    ceremony: 'Siegerehrung: So, 22.02.2026 um 16:45 Uhr',
  };

  readonly matches: TournamentMatch[] = [
    {
      matchNumber: 1,
      matchDay: '1. Spieltag',
      date: '21.02.26',
      time: '10:00',
      teamA: 'Uerdinger Schwimmverein 08',
      teamB: 'SC Chemnitz 1892',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: false,
    },
    {
      matchNumber: 2,
      matchDay: '1. Spieltag',
      date: '21.02.26',
      time: '11:30',
      teamA: 'Eimsbütteler Turnverband',
      teamB: 'Wfr. Spandau 04',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: true,
    },
    {
      matchNumber: 3,
      matchDay: '1. Spieltag',
      date: '21.02.26',
      time: '13:30',
      teamA: 'Uerdinger Schwimmverein 08',
      teamB: 'SSV Esslingen',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: false,
    },
    {
      matchNumber: 4,
      matchDay: '1. Spieltag',
      date: '21.02.26',
      time: '15:00',
      teamA: 'Wfr. Spandau 04',
      teamB: 'SC Chemnitz 1892',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: true,
    },
    {
      matchNumber: 5,
      matchDay: '1. Spieltag',
      date: '21.02.26',
      time: '16:30',
      teamA: 'SSV Esslingen',
      teamB: 'Eimsbütteler Turnverband',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: false,
    },
    {
      matchNumber: 6,
      matchDay: '2. Spieltag',
      date: '22.02.26',
      time: '09:00',
      teamA: 'Eimsbütteler Turnverband',
      teamB: 'Uerdinger Schwimmverein 08',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: false,
    },
    {
      matchNumber: 7,
      matchDay: '2. Spieltag',
      date: '22.02.26',
      time: '10:30',
      teamA: 'SSV Esslingen',
      teamB: 'Wfr. Spandau 04',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: true,
    },
    {
      matchNumber: 8,
      matchDay: '2. Spieltag',
      date: '22.02.26',
      time: '12:00',
      teamA: 'Eimsbütteler Turnverband',
      teamB: 'SC Chemnitz 1892',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: false,
    },
    {
      matchNumber: 9,
      matchDay: '2. Spieltag',
      date: '22.02.26',
      time: '13:30',
      teamA: 'Wfr. Spandau 04',
      teamB: 'Uerdinger Schwimmverein 08',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: true,
    },
    {
      matchNumber: 10,
      matchDay: '2. Spieltag',
      date: '22.02.26',
      time: '15:00',
      teamA: 'SC Chemnitz 1892',
      teamB: 'SSV Esslingen',
      venue: 'Hamburg',
      info: 'mehr...',
      isSpandauGame: false,
    },
  ];

  ngOnInit(): void {
    this.seo.updateSeo({
      title: 'Turniere | Bianca Mitterbauer',
      description:
        'Aktuelle Turnierübersicht mit Spielplan, Matchzeiten und Fokus auf Wasserfreunde Spandau 04. Sponsor-ready aufbereitet für Partner und Medien.',
      image: 'https://biancamitterbauer.de/assets/images/logos/logo_dsv.png',
      url: 'https://biancamitterbauer.de/tournaments',
      canonical: 'https://biancamitterbauer.de/tournaments',
    });
  }
}
