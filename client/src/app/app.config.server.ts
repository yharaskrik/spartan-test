import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { APP_BASE_HREF } from '@angular/common';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: APP_BASE_HREF,
      useValue: 'https://jaybell-brandons-config.spartan-test.pages.dev',
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
