import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent } from './core/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}
