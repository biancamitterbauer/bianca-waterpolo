import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstallService {
  private beforeInstallPromptEvent: any | null = null;
  private showModalSubject = new BehaviorSubject(false);
  readonly showModal$ = this.showModalSubject.asObservable();

  constructor() {
    if (typeof window === 'undefined') return;

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      this.beforeInstallPromptEvent = e;
    });
  }

  canPromptInstall(): boolean {
    if (typeof window === 'undefined') return false;
    return !!this.beforeInstallPromptEvent;
  }

  async promptInstall(): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve();
    if (!this.beforeInstallPromptEvent) return Promise.resolve();

    try {
      // show prompt
      await this.beforeInstallPromptEvent.prompt();
      // wait for user choice if available
      if (this.beforeInstallPromptEvent.userChoice) {
        await this.beforeInstallPromptEvent.userChoice;
      }
    } catch {
      // ignore
    } finally {
      this.beforeInstallPromptEvent = null;
    }
  }

  isIos(): boolean {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent || '';
    return /iPad|iPhone|iPod/.test(ua) && !('MSStream' in window);
  }

  isInStandaloneMode(): boolean {
    if (typeof window === 'undefined') return false;
    // iOS standalone
    // @ts-ignore
    if ((window as any).navigator && (window as any).navigator.standalone) return true;
    // display-mode media query
    try {
      return window.matchMedia('(display-mode: standalone)').matches;
    } catch {
      return false;
    }
  }

  openModal(): void {
    this.showModalSubject.next(true);
  }

  closeModal(): void {
    this.showModalSubject.next(false);
  }
}
