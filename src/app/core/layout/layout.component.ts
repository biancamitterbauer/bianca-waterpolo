import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink],
  template: `
    <header class="site-header">
      <div class="site-container nav-bar">
        <div class="brand">
          <a class="nav-link" routerLink="/">Bianca M.</a>
        </div>
        <nav class="nav-links" aria-label="Main navigation">
          <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
          <a class="nav-link" routerLink="/achievements" routerLinkActive="active">Achievements</a>
          <a class="nav-link" routerLink="/news" routerLinkActive="active">News</a>
          <a class="nav-link" routerLink="/training" routerLinkActive="active">Training</a>
          <a class="nav-link" routerLink="/tournaments" routerLinkActive="active">Tournaments</a>
          <a class="nav-link" routerLink="/media" routerLinkActive="active">Media</a>
          <a class="nav-link" routerLink="/sponsors" routerLinkActive="active">Sponsors</a>
          <a class="nav-link" routerLink="/press" routerLinkActive="active">Press</a>
          <a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact</a>
          <a class="nav-link" routerLink="/legal" routerLinkActive="active">Legal</a>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <router-outlet></router-outlet>
    </main>

    <footer class="site-footer">
      <div class="site-container">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap">
          <div>© { new Date().getFullYear() } Bianca Mitterbauer</div>
          <div style="display:flex;gap:1rem">
            <a class="nav-link" routerLink="/legal">Legal</a>
            <a class="nav-link" href="#">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class LayoutComponent {}
