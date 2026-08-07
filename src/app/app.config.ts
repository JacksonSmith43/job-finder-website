import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // This makes sure that when navigating to a new route, the page scrolls to the top of the page.
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    )
  ]
};
