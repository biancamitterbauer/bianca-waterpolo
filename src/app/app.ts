import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LayoutComponent } from './core/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  launchActive = true;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (!this.isBrowser) {
      this.launchActive = false;
    }
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    setTimeout(() => {
      this.launchActive = false;
    }, 520);
  }
}
