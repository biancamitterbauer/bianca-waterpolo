import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  /** Set title and description with basic OpenGraph tags. */
  setMeta(options: { title?: string; description?: string; url?: string; image?: string } = {}) {
    const title = options.title || 'Bianca Mitterbauer — Water Polo';
    const description = options.description || 'Official site for Bianca Mitterbauer — German national water polo player.';
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    // OpenGraph
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    if (options.url) this.meta.updateTag({ property: 'og:url', content: options.url });
    if (options.image) this.meta.updateTag({ property: 'og:image', content: options.image });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
