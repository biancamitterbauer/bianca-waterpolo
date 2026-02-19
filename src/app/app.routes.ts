import { Routes } from '@angular/router';

// Lazy routes pointing to a minimal placeholder component for now.
export const routes: Routes = [
	{ path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
	{ path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
	{ path: 'achievements', loadComponent: () => import('./features/achievements/achievements.component').then(m => m.AchievementsComponent) },
	{ path: 'news', loadComponent: () => import('./features/news/news.component').then(m => m.NewsComponent) },
	{ path: 'training', loadComponent: () => import('./features/training/training.component').then(m => m.TrainingComponent) },
	{ path: 'tournaments', loadComponent: () => import('./features/tournaments/tournaments.component').then(m => m.TournamentsComponent) },
	{ path: 'bundesliga-weibl', loadComponent: () => import('./features/bundesliga-weibl/bundesliga-weibl.component').then(m => m.BundesligaWeiblComponent) },
	{ path: 'media', loadComponent: () => import('./features/media/media.component').then(m => m.MediaComponent) },
	{ path: 'sponsors', redirectTo: 'sponsor-pitch', pathMatch: 'full' },
	{ path: 'press', loadComponent: () => import('./features/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
	{ path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
	{ path: 'legal', loadComponent: () => import('./features/placeholder/placeholder.component').then(m => m.PlaceholderComponent) },
	{ path: 'sponsor-pitch', loadComponent: () => import('./features/sponsor-pitch/sponsor-pitch.component').then(m => m.SponsorPitchComponent) },
	{ path: '**', redirectTo: '' }
];
