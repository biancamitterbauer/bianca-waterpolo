import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'achievements', renderMode: RenderMode.Prerender },
  { path: 'news', renderMode: RenderMode.Prerender },
  { path: 'training', renderMode: RenderMode.Prerender },
  { path: 'tournaments', renderMode: RenderMode.Prerender },
  { path: 'bundesliga-weibl', renderMode: RenderMode.Prerender },
  { path: 'media', renderMode: RenderMode.Prerender },
  { path: 'sponsor-pitch', renderMode: RenderMode.Prerender },
  { path: 'presse', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'impressum', renderMode: RenderMode.Prerender },
  { path: 'datenschutz', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server }
];
