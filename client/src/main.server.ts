import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

if (import.meta.env.PROD) {
  enableProdMode();
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default async function render(url: string, document: string, ...args: any[]) {
  console.log('url', url);
  console.log('document', document);
  console.log('args', args);
  const html = await renderApplication(bootstrap, {
    document,
    url: `https://jaybell-brandons-config.spartan-test.pages.dev${url}`,
  });
  return html;
}
