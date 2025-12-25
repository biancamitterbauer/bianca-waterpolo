import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { I18nService, SupportedLang } from '../../i18n/i18n.service';

type NavItem = {
  labelKey: string;
  path: string;
  exact?: boolean;
};

type LanguageOption = {
  code: SupportedLang;
  labelKey: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, I18nPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  protected readonly i18n = inject(I18nService);

  readonly currentLang = this.i18n.currentLang;
  readonly navItems: NavItem[] = [
    { labelKey: 'nav.home', path: '/', exact: true },
    { labelKey: 'nav.achievements', path: '/achievements' },
    { labelKey: 'nav.news', path: '/news' },
    { labelKey: 'nav.training', path: '/training' },
    { labelKey: 'nav.tournaments', path: '/tournaments' },
    { labelKey: 'nav.media', path: '/media' },
    { labelKey: 'nav.sponsors', path: '/sponsors' },
    { labelKey: 'nav.press', path: '/press' },
    { labelKey: 'nav.contact', path: '/contact' },
    { labelKey: 'nav.legal', path: '/legal' },
  ];

  readonly languageOptions: LanguageOption[] = [
    { code: 'de', labelKey: 'lang.de' },
    { code: 'en', labelKey: 'lang.en' },
  ];

  readonly menuOpen = signal(false);
  readonly rlaExact = { exact: true } as const;
  readonly rlaNonExact = { exact: false } as const;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  toggleMenu(): void {
    this.menuOpen.update((state) => !state);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  setLang(lang: SupportedLang): void {
    this.i18n.setLang(lang);
  }
}
