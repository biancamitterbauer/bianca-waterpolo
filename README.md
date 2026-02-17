# BiancaWaterpolo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Server-Side Rendering (SSR) on Netlify

This project uses Angular SSR with Netlify Edge Functions for server-side rendering in production.

### Local SSR Testing

To test the full SSR experience locally (before deploying to Netlify), use the Netlify CLI:

```bash
# Install netlify-cli globally (if not already installed)
npm install -g netlify-cli

# Build the project with SSR
npm run build

# Start the local Netlify dev server (runs SSR via Edge Functions simulation)
netlify dev
```

The server will be available at `http://localhost:8888/`. This simulates the Netlify Edge Functions environment locally, so you can verify SSR rendering before deployment.

**Note:** Always use `ng serve` for quick local development (faster rebuild). Use `netlify dev` only when you need to test production-like SSR behavior or Netlify-specific features.

### Deployment to Netlify

1. Connect your repository to Netlify
2. Netlify will automatically detect the `netlify.toml` configuration
3. The build will run `npm ci && npx ng build` and serve from `dist/bianca-waterpolo/browser`
4. All requests are handled by the Angular SSR Edge Function for dynamic rendering

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
