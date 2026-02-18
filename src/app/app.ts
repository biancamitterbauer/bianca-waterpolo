import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from './core/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  appReady = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.appReady = true;
    }, 120);
  }
}
