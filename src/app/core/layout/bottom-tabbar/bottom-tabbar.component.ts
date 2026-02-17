import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';

interface Tab {
  label: string;
  path: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-bottom-tabbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './bottom-tabbar.component.html',
  styleUrls: ['./bottom-tabbar.component.scss'],
})
export class BottomTabbarComponent {
  tabs: Tab[] = [
    { label: 'Home', path: '/', icon: 'home', exact: true },
    { label: 'Profil', path: '/about', icon: 'profile', exact: false },
    { label: 'Erfolge', path: '/achievements', icon: 'award', exact: false },
    { label: 'News', path: '/news', icon: 'news', exact: false },
    { label: 'Sponsor', path: '/sponsors', icon: 'sponsor', exact: false },
  ];

  getIconSVG(icon: string): string {
    const icons: Record<string, string> = {
      home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
      profile: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
      award: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      news: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9H7v2h7v-2zm8-4H7v2h15V8z"/></svg>',
      sponsor: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    };
    return icons[icon] || '';
  }
}
