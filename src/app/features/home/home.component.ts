import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('portrait', { static: true }) portrait?: ElementRef<HTMLImageElement>;
  private portraitObserver?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngAfterViewInit(): void {
    const portraitElement = this.portrait?.nativeElement;
    if (!portraitElement) {
      return;
    }

    const revealPortrait = () => portraitElement.classList.add('in-view');

    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      revealPortrait();
      return;
    }

    this.portraitObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealPortrait();
          this.portraitObserver?.disconnect();
        }
      });
    }, { threshold: 0.35 });

    this.portraitObserver.observe(portraitElement);
  }

  ngOnDestroy(): void {
    this.portraitObserver?.disconnect();
  }
}
