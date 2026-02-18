import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AppLaunchService {
  private readonly key = 'bm_app_launch_done';

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  shouldAnimate(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return sessionStorage.getItem(this.key) !== '1';
  }

  markAnimated(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    sessionStorage.setItem(this.key, '1');
  }
}
