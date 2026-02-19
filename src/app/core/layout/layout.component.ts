import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BottomTabbarComponent } from './bottom-tabbar/bottom-tabbar.component';
import { InstallService } from '../pwa/install.service';
import { I18nPipe } from '../i18n/i18n.pipe';
import { I18nService, SupportedLang } from '../i18n/i18n.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, HeaderComponent, BottomTabbarComponent, I18nPipe],
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
          <div style="display:flex;justify-content:center;align-items:center;gap:1rem">
            <div class="language-switch" role="group" aria-label="Sprachauswahl Footer">
              <button
                *ngFor="let lang of languageOptions"
                type="button"
                class="lang-btn"
                [class.active]="currentLang() === lang.code"
                [attr.aria-pressed]="currentLang() === lang.code"
                (click)="setLang(lang.code)"
              >
                {{ lang.labelKey | t }}
              </button>
            </div>
          </div>
          <div style="display:flex;gap:1rem;align-items:center">
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
  private readonly i18n = inject(I18nService);
  isStandalone = false;
  canPrompt = false;
  isIosPlatform = false;

  readonly languageOptions: { code: SupportedLang; labelKey: string }[] = [
    { code: 'de', labelKey: 'lang.de' },
    { code: 'en', labelKey: 'lang.en' },
  ];

  readonly currentLang = this.i18n.currentLang;

  ngOnInit(): void {
    this.isStandalone = this.installService.isInStandaloneMode();
    this.canPrompt = this.installService.canPromptInstall();
    this.isIosPlatform = this.installService.isIos();

    // SSR-safe: only access document/window in the browser
    if (typeof window !== 'undefined' && this.isStandalone) {
      try {
        document.body.classList.add('standalone-mode');
      } catch (e) {
        // noop - defensive for strict CSP or SSR edge cases
      }
    }
  }

  setLang(lang: SupportedLang): void {
    this.i18n.setLang(lang);
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
