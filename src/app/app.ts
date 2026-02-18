import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { LayoutComponent } from './core/layout/layout.component';
import { AppLaunchService } from './core/app-launch/app-launch.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy {
  appReady = true;
  runIntro = false;

  private readyTimer?: ReturnType<typeof setTimeout>;
  private markTimer?: ReturnType<typeof setTimeout>;
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private readonly launch: AppLaunchService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.appReady = true;
      return;
    }

    const introDisabled = localStorage.getItem('bm_disable_intro') === '1';
    if (introDisabled) {
      this.runIntro = false;
      this.appReady = true;
      this.launch.markAnimated();
      return;
    }

    this.runIntro = this.launch.shouldAnimate();
    if (!this.runIntro) {
      this.appReady = true;
      return;
    }

    this.appReady = false;

    this.readyTimer = setTimeout(() => {
      this.appReady = true;
    }, 120);

    this.markTimer = setTimeout(() => {
      this.launch.markAnimated();
      this.runIntro = false;
    }, 700);
  }

  ngOnDestroy(): void {
    if (this.readyTimer) {
      clearTimeout(this.readyTimer);
    }
    if (this.markTimer) {
      clearTimeout(this.markTimer);
    }
  }
}
