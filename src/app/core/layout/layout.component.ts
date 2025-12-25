import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="app-main">
      <router-outlet></router-outlet>
    </main>

    <footer class="site-footer">
      <div class="site-container">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap">
          <div>© {{ currentYear }} Bianca Mitterbauer</div>
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
export class LayoutComponent {
  readonly currentYear = new Date().getFullYear();
}
