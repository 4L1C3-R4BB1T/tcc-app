import { Component, QueryList, signal, ViewChildren } from '@angular/core';
import { ScrollCustomEvent } from '@ionic/angular';
import { TrailProgressComponent } from './components/trail-progress/trail-progress.component';
import { TrailItem } from 'src/app/models/trail-item';


interface Secao {
  id: number;
  title: string;
  items: TrailItem[];
}

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


  secoes: Secao[] = [
    {
      id: 1,
      title: "Secao 1",
      items: [
        { id: 1, completed: true, icon: 'fa-solid fa-book' },
        { id: 2, completed: true },
        { id: 3 },
        { id: 4, disabled: true },
        { id: 5, disabled: true, icon: 'fa-solid fa-trophy' }
      ],
    },
    {
      id: 2,
      title: "Secao 2",
      items: [
        { id: 1, completed: true, icon: 'fa-solid fa-book' },
        { id: 2, completed: true },
        { id: 3 },
        { id: 4, disabled: true },
        { id: 5, disabled: true, icon: 'fa-solid fa-trophy' }
      ],
    }
  ];

  currentTitle = signal(this.secoes[0].title);

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
