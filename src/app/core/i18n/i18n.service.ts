import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import deDictionary from '../../../assets/i18n/de.json';
import enDictionary from '../../../assets/i18n/en.json';

export type SupportedLang = 'de' | 'en';

const STATIC_DICTIONARIES: Record<SupportedLang, Record<string, string>> = {
  de: deDictionary as Record<string, string>,
  en: enDictionary as Record<string, string>,
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'lang';
  private readonly lang = signal<SupportedLang>(this.resolveInitialLang());
  private readonly translations = signal<Record<string, string>>({});
  private loadedLang: SupportedLang | null = null;

  readonly currentLang = computed(() => this.lang());

  constructor() {
    void this.loadDictionary(this.lang());
  }

  t(key: string): string {
    const dictionary = this.translations();
    return dictionary[key] ?? key;
  }

  setLang(lang: SupportedLang): void {
    if (lang === this.lang()) {
      return;
    }

    this.lang.set(lang);
    this.persist(lang);
    void this.loadDictionary(lang);
  }

  private resolveInitialLang(): SupportedLang {
    if (this.isBrowser()) {
      const stored = localStorage.getItem(this.storageKey);
      if (stored === 'en') {
        return 'en';
      }
    }

    return 'de';
  }

  private persist(lang: SupportedLang): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, lang);
    }
  }

  private async loadDictionary(lang: SupportedLang): Promise<void> {
    if (this.loadedLang === lang) {
      return;
    }

    this.translations.set(STATIC_DICTIONARIES[lang]);

    if (!this.isBrowser()) {
      this.loadedLang = lang;
      return;
    }

    try {
      const dict = await firstValueFrom(
        this.http.get<Record<string, string>>(`assets/i18n/${lang}.json`)
      );
      this.translations.set(dict);
    } catch (error) {
      console.error('[I18nService] Failed to load dictionary for', lang, error);
      if (lang !== 'de') {
        this.lang.set('de');
        this.persist('de');
        void this.loadDictionary('de');
      }
    } finally {
      this.loadedLang = lang;
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
