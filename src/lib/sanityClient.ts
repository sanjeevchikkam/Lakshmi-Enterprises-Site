import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Get environment configurations from .env.example settings
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-06-04';

// Setup central, correctly initialized client
export const client = projectId && projectId.trim() !== ''
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

// Helper to resolve image URLs across both real Sanity image records and custom string URLs
export function urlFor(source: any): string {
  if (!source) {
    return 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=600';
  }

  // If it's a string directly (mock or external image URL), return it
  if (typeof source === 'string') {
    return source;
  }

  // If it's a Sanity image object, try to compile it with imageUrlBuilder
  if (builder && (source.asset || source._ref)) {
    try {
      return builder.image(source).url() || '';
    } catch {
      // Fallback if compilation fails
    }
  }

  // Fallback to source.url if defined
  if (source.url) return source.url;

  return 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=600';
}
