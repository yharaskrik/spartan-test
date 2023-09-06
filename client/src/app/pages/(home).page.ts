import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'client-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <client-analog-welcome /> `,
})
export default class HomeComponent {}
