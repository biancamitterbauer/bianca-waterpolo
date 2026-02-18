import { Routes } from '@angular/router';

// Lazy routes pointing to a minimal placeholder component for now.
export const routes: Routes = [
	{ path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
	{ path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
	{ path: 'achievements', loadComponent: () => import('./features/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
	{ path: 'news', loadComponent: () => import('./features/news/news.component').then(m => m.NewsComponent) },
	{ path: 'training', loadComponent: () => import('./features/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
	{ path: 'tournaments', loadComponent: () => import('./features/tournaments/tournaments.component').then(m => m.TournamentsComponent) },
	{ path: 'media', loadComponent: () => import('./features/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
	{ path: 'sponsors', loadComponent: () => import('./features/sponsors/sponsors.component').then(m => m.SponsorsComponent) },
	{ path: 'press', loadComponent: () => import('./features/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
	{ path: 'contact', loadComponent: () => import('./features/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
	{ path: 'legal', loadComponent: () => import('./features/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
	{ path: 'sponsor-pitch', loadComponent: () => import('./features/sponsor-pitch/sponsor-pitch.component').then(m => m.SponsorPitchComponent) },
	{ path: '**', redirectTo: '' }
];
