import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
}

/**
 * SEO Service for managing meta tags and title in Angular with SSR support.
 * 
 * Sets:
 * - Page title
 * - Meta description
 * - OpenGraph tags (og:title, og:description, og:type, og:image, og:url)
 * - Twitter card tags (twitter:card, twitter:title, twitter:description)
 * - Canonical link (optional)
 * 
 * All operations are SSR-safe and work with Angular's SSR rendering.
 */
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Update SEO metadata for the current page.
   * @param options SEO options including title, description, image, url, and optional canonical
   */
  updateSeo(options: SeoOptions): void {
    const { title, description, image = '', url = '', type = 'website', canonical } = options;

    // Set page title
    this.titleService.setTitle(title);

    // Set meta description
    this.setMetaTag('description', description);

    // OpenGraph tags
    this.setMetaTag('og:title', title, 'property');
    this.setMetaTag('og:description', description, 'property');
    this.setMetaTag('og:type', type, 'property');

    if (image) {
      this.setMetaTag('og:image', image, 'property');
    }

    if (url) {
      this.setMetaTag('og:url', url, 'property');
    }

    // Twitter Card tags
    this.setMetaTag('twitter:card', 'summary_large_image');
    this.setMetaTag('twitter:title', title);
    this.setMetaTag('twitter:description', description);

    if (image) {
      this.setMetaTag('twitter:image', image);
    }

    // Canonical link (optional)
    if (canonical) {
      this.setCanonical(canonical);
    }
  }

  /**
   * Set or update a meta tag in the document head.
   * @param name The name or property of the meta tag
   * @param content The content value
   * @param attribute The attribute type ('name' or 'property', defaults to 'name')
   */
  private setMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name'): void {
    const selector = attribute === 'property' ? `meta[property="${name}"]` : `meta[name="${name}"]`;

    // Try to find existing tag
    let tag = this.metaService.getTag(attribute === 'property' ? `property='${name}'` : `name='${name}'`);

    if (tag) {
      // Update existing tag
      this.metaService.updateTag({ [attribute]: name, content });
    } else {
      // Create new tag
      const meta: { [key: string]: string } = { content };
      meta[attribute] = name;
      this.metaService.addTag(meta);
    }
  }

  /**
   * Set canonical link for the page.
   * Only runs in browser environment (SSR-safe).
   * @param url The canonical URL
   */
  private setCanonical(url: string): void {
    // Only set canonical link in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Remove existing canonical tag if present
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Create and add new canonical tag
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    document.head.appendChild(canonical);
  }

  /**
   * Reset SEO tags to defaults (useful for clearing between route changes).
   */
  resetSeo(): void {
    this.titleService.setTitle('Bianca Mitterbauer | Wasserballer');
    this.setMetaTag('description', 'Offizielle Website von Bianca Mitterbauer. Deutsche Wasserball Nationalspielerin.');
  }
}
