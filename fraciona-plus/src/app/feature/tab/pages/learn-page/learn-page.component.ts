import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss'],
})
export class LearnPageComponent {

  scrollChanged = signal(false);

  constructor() {
    effect(() => {
      if (this.scrollChanged()) {
        setTimeout(() => this.scrollChanged.set(false), 50);
      }
    }, { allowSignalWrites: true })
  }
}
