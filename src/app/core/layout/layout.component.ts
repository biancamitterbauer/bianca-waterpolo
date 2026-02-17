import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BottomTabbarComponent } from './bottom-tabbar/bottom-tabbar.component';
import { InstallService } from '../pwa/install.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink, HeaderComponent, BottomTabbarComponent],
  template: `
    <app-header></app-header>
    <main class="app-main">
      <router-outlet></router-outlet>
    </main>
    <app-bottom-tabbar></app-bottom-tabbar>

    <footer class="site-footer">
      <div class="site-container">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap">
          <div>© {{ currentYear }} Bianca Mitterbauer</div>
          <div style="display:flex;gap:1rem;align-items:center">
            <a class="nav-link" routerLink="/legal">Legal</a>
            <a class="nav-link" href="#">Privacy</a>
            <button
              *ngIf="!isStandalone && (canPrompt || isIosPlatform)"
              class="nav-link footer-install"
              (click)="footerInstall()"
              aria-label="App installieren"
            >
              App installieren
            </button>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class LayoutComponent {
  readonly currentYear = new Date().getFullYear();
  private installService = inject(InstallService);
  isStandalone = false;
  canPrompt = false;
  isIosPlatform = false;

  ngOnInit(): void {
    this.isStandalone = this.installService.isInStandaloneMode();
    this.canPrompt = this.installService.canPromptInstall();
    this.isIosPlatform = this.installService.isIos();
  }

  footerInstall(): void {
    if (this.canPrompt) {
      this.installService.promptInstall();
      return;
    }
    if (this.isIosPlatform) {
      this.installService.openModal();
    }
  }
}
