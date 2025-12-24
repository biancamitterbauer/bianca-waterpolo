import { Component, signal } from '@angular/core';
import { LayoutComponent } from './core/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: `<app-layout></app-layout>`,
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('bianca-waterpolo');
}
