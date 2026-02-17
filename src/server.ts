import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

/**
 * Netlify Edge Function Handler
 * This enables true server-side rendering on Netlify via Edge Functions.
 * 
 * The AngularAppEngine handles all routing and server-side rendering.
 * Static assets are served from dist/bianca-waterpolo/browser (configured in netlify.toml).
 */
const angularAppEngine = new AngularAppEngine();

/**
 * Netlify Edge Function handler for server-side rendering.
 * Processes all requests and returns rendered Angular responses.
 */
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const result = await angularAppEngine.handle(request);
  return result || new Response('Not found', { status: 404 });
}

/**
 * Request handler exported for use with Netlify Angular Runtime.
 * This is automatically invoked by Netlify Edge Functions.
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);

/**
 * Development server entry point (for local testing with netlify-cli).
 * When running `netlify dev`, this allows local SSR testing before deploy.
 */
if (process.env['NETLIFY_DEV']) {
  const port = process.env['PORT'] || 8888;
  console.log(`[SSR] Netlify development server configured on port ${port}`);
  console.log(`[SSR] Use 'netlify dev' to test SSR locally`);
}
