import { Component, QueryList, signal, ViewChildren } from '@angular/core';
import { ScrollCustomEvent } from '@ionic/angular';
import { TrailProgressComponent } from './components/trail-progress/trail-progress.component';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss'],
})
export class LearnPageComponent  {

  @ViewChildren(TrailProgressComponent)
  listTrailProgress!: QueryList<TrailProgressComponent>;

  scrollChanged = signal(false);

  scrollStart = signal(true);

  currentTitle = signal('Aprenda sobre operações básicas');

  onScroll(event: ScrollCustomEvent) {
    this.scrollStart.set(event.detail.scrollTop === 0);
    this.scrollChanged.set(true);
    setTimeout(() => this.scrollChanged.set(false), 50);
    this.listTrailProgress?.forEach(item => {
      const { y, height } = item.elementRef.nativeElement.getBoundingClientRect();
      if (Math.abs(y) + (event.detail.scrollTop / 2) < height) {
        this.currentTitle.set(item.title());
      }
    });
  }
  
}
