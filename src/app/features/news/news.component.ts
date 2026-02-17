import { ChangeDetectionStrategy, Component, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

type NewsStory = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  date: string;
  location?: string;
  metrics: string[];
  link?: string;
};

type HeroStat = {
  label: string;
  value: string;
  detail: string;
};

type EditorialAngle = {
  label: string;
  description: string;
};

type InstagramPost = {
  id: string;
  imageUrl: string;
  caption: string;
  postedOn: string;
  permalink?: string;
  accountHandle: string;
  accountLabel: string;
  accountProfileImage: string;
  accountUrl: string;
};

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    this.loadInstagramEmbedScript();
  }

  private loadInstagramEmbedScript(): void {
    const win = window as any;
    if (win.instgrm && win.instgrm.Embeds) {
      try { win.instgrm.Embeds.process(); } catch {}
      return;
    }

    const existing = Array.from(this.document.getElementsByTagName('script')).find(
      (s) => s.src && s.src.includes('instagram.com/embed.js')
    );
    if (existing) {
      existing.addEventListener('load', () => win.instgrm?.Embeds?.process());
      return;
    }

    const script = this.renderer.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      try { win.instgrm?.Embeds?.process(); } catch {}
    };
    this.renderer.appendChild(this.document.body, script);
  }
  readonly heroStats: HeroStat[] = [
    { label: 'Aktuelle Saison', value: 'Bundesliga 24/25', detail: 'Spandau 04 · Tabellenführung' },
    { label: 'Letztes Spiel', value: '02. Januar 2026', detail: 'LEN Qualification · 4 Tore' },
    { label: 'Nächster Gegner', value: 'Waspo 98 Hannover', detail: 'Bundesliga · 06.01.' },
  ];

  readonly newsStories: NewsStory[] = [
    {
      id: 'len-qualifiers',
      kicker: 'LEN Champions League',
      title: 'Ticket für die Hauptrunde gesichert',
      summary:
        'Spandau 04 gewinnt das entscheidende Quali-Spiel gegen Terrassa mit 15:11. Bianca steuert vier Treffer bei und zwingt in der Crunch-Time zwei Ballgewinne im Center-Verteidigen.',
      date: '02. Januar 2026',
      location: 'Berlin · Schöneberg',
      metrics: ['4 Tore · 1 Steal', '+6 Differenz im Plus/Minus', 'Powerplay Quote: 71 %'],
      link: 'https://spandau04.de/news/len-ticket',
    },
    {
      id: 'bundesliga-round',
      kicker: 'Bundesliga',
      title: 'Auswärtssieg in Hannover',
      summary:
        'Im Topspiel gegen Waspo 98 setzt Spandau sich 13:9 durch. Bianca eröffnet das Scoring, verlagert wiederholt das Spiel auf die rechte Seite und bleibt über 28 Minuten im Wasser.',
      date: '28. Dezember 2025',
      location: 'Hannover · Volksbad Limmer',
      metrics: ['3 Tore · 3 Assists', '2 geblockte Würfe', 'Swim-Offs: 3/3 gewonnen'],
      link: 'https://dwbl.de/gamecenter/waspo-vs-spandau',
    },
    {
      id: 'nationalteam-camp',
      kicker: 'Nationalteam',
      title: 'DSV-Lehrgang mit Fokus Überzahl',
      summary:
        'Der DSV-Kader arbeitet in Berlin an Setplays für die Universiade. Bianca übernimmt den rechten Rückraum, trainiert Shot Variations aus Distanz und Schnellangriffe nach Steal.',
      date: '22. Dezember 2025',
      location: 'Berlin · Olympiapark',
      metrics: ['4 Einheiten/Tag', 'Video-Sessions: 3', 'Scrimmages: 2'],
    },
  ];

  readonly editorialAngles: EditorialAngle[] = [
    {
      label: 'Match Analytics',
      description: 'Shot-Maps, Überzahl-Effizienz und Clutch-Sequenzen aus Bundesliga & LEN-Spielen.',
    },
    {
      label: 'Training Load',
      description: 'Sessions, Recovery-Blöcke und Monitoring-Werte aus dem Olympiapark.',
    },
    {
      label: 'Nationalteam Radar',
      description: 'Lehrgänge, Turniere und Scouting-Notizen mit Fokus auf die rechte Seite.',
    },
  ];

  private readonly instagramSource: InstagramPost[] = [
    {
      id: 'insta-1',
      imageUrl: '/assets/images/instagram/DP9bs92CFiA.jpg',
      caption: `Die Wasserfreunde Spandau 04 gewinnen den Supercup der Frauen 🏆🇩🇪

Bis zum Ende des dritten Viertels zeichnete sich ein Kopf-an-Kopf-Rennen mit dem Team von @wasserball_bochum ab, doch am Ende konnten sich die Doublesiegerinnen der vergangenen Saison mit 15:11 durchsetzen.

📸 @tinohenschelphoto

#dieligadierockt #wasserball #waterpolo #bundesliga #womenswaterpolo`,
      postedOn: '03. Januar 2026',
      permalink: 'https://www.instagram.com/p/DP9bs92CFiA/',
      accountHandle: '@wasserballbundesliga',
      accountLabel: 'Wasserball Bundesliga',
      accountProfileImage: '/assets/images/instagram/profile_wasserballbundesliga.jpg',
      accountUrl: 'https://www.instagram.com/wasserballbundesliga/',
    },
    {
      id: 'insta-4',
      imageUrl: '/assets/images/instagram/DOdcAtxCGCE.jpg',
      caption: `U18 Wasserball-EM auf Malta ❤️🖤

@nele_politze hat ihre ersten Länderspiele für Deutschland bei der U18 EM in Malta absolviert. Neben Nele nahm auch Neuberlinerin @biancamitterbauer an der Wasserball JEM teil.

Beide Spielerinnen der Wasserfreunde Spandau 04 hatten große Spielanteile im deutschen Spiel und trugen mit ihren vielen Toren zum Erfolg des deutschen Teams maßgeblich bei.

Nach zwei Auftaktsiegen gegen die Ukraine 14:5 und Irland 20:7 kam es leider zu einer unglücklichen Niederlage gegen Serbien mit 9:12. Durch den 16:10 Sieg gegen den Gastgeber Malta erreichte die deutsche U18 Nationalmannschaft den zweiten Platz in der Vorrundengruppe. Das darauf folgende Crossover-Spiel gegen die sehr starken Holländerinnen wurde leider sehr knapp mit 12:11 verloren.

Somit ging es leider nur in die Platzierungsspiele 9-12.

Nach dem wichtigen 11:10 Sieg gegen Great Britain folgte dann die 14:9 Niederlage gegen die Türkei.

Am Ende freuten sich Nele und Bianca über Platz 10 bei der U18 EM. Glückwunsch!

#wirsindspandau04 #u18emfrauen

___________________

@gewobag_ag
@bbfbikes
@arenagermany
@abus_cycling
@wirberlin
@vaditim
@berliner_baederbetriebe`,
      postedOn: '02. Januar 2026',
      permalink: 'https://www.instagram.com/p/DOdcAtxCGCE/',
      accountHandle: '@spandau04_official',
      accountLabel: 'Wasserfreunde Spandau 04',
      accountProfileImage: '/assets/images/instagram/profile_spandau04_official.jpg',
      accountUrl: 'https://www.instagram.com/spandau04_official/',
    },
    {
      id: 'insta-2',
      imageUrl: '/assets/images/instagram/DKU82xos4nz.jpg',
      caption: `wasserballbundesliga

@spandau04wwp gewinnt den Titel in der Bundesliga der Frauen 🏆🇩🇪

📸 @tinohenschelphoto

#dieligadierockt #wasserball #waterpolo #bundesliga #deutschermeister`,
      postedOn: '16. September 2022',
      permalink: 'https://www.instagram.com/p/DKU82xos4nz/',
      accountHandle: '@wasserballbundesliga',
      accountLabel: 'Wasserball Bundesliga',
      accountProfileImage: '/assets/images/instagram/profile_wasserballbundesliga.jpg',
      accountUrl: 'https://www.instagram.com/wasserballbundesliga/',
    },
    {
      id: 'insta-3',
      imageUrl: '/assets/images/instagram/DLrh8o1NxY2.jpg',
      caption: `U16 Europameisterschaft 2025 🇩🇪

Foto: Copyright 2025 by European Aquatics`,
      postedOn: '30. Dezember 2025',
      permalink: 'https://www.instagram.com/p/DLrh8o1NxY2/',
      accountHandle: '@biancamitterbauer',
      accountLabel: 'Bianca Mitterbauer',
      accountProfileImage: '/assets/images/instagram/profile_biancamitterbauer.jpg',
      accountUrl: 'https://www.instagram.com/biancamitterbauer/',
    },
    {
      id: 'insta-5',
      imageUrl: '/assets/images/instagram/DKTeRoVomy6.jpg',
      caption: `Neuzugang Alert!

Willkommen bei den Wasserfreunden Spandau 04! Wir freuen uns riesig, Bianca Mitterbauer bei uns begrüßen zu dürfen. ❤️

👉 16 Jahre jung
👉 Rechts halb/außen
👉 Wechselt von Waspo Hannover nach Spandau

Mit ihrem Ehrgeiz, Spielverständnis und Tempo konnte Bianca bereits bei der U15 Europameisterschaft und der U16 Weltmeisterschaft auftrumpfen und bringt frischen Wind in unser Team. Wir können es kaum erwarten, sie in der schwarz-roten Kappe im Wasser zu sehen! ❤️🖤

Sie unterschreibt einen Vertrag bis 2028 – willkommen in Berlin, Bianca. Auf eine starke Saison! 🔥

#WasserfreundeSpandau04 #Neuzugang #Wasserball #Frauenpower #TeamZukunft

_____________________________

@gewobag_ag
@bbfbikes
@arenagermany
@abus_cycling
@wirberlin
@vaditim
@berliner_baederbetriebe`,
      postedOn: '03. Januar 2026',
      permalink: 'https://www.instagram.com/p/DKTeRoVomy6/',
      accountHandle: '@spandau04_official',
      accountLabel: 'Wasserfreunde Spandau 04',
      accountProfileImage: '/assets/images/instagram/profile_spandau04_official.jpg',
      accountUrl: 'https://www.instagram.com/spandau04_official/',
    },
  ];

  readonly instagramPosts: InstagramPost[] = this.instagramSource.map((post) => ({
    ...post,
    permalink: post.permalink ?? '#',
  }));
}
