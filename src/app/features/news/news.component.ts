import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
