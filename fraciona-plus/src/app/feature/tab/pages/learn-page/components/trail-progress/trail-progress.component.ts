import { ChangeDetectorRef, Component, ElementRef, inject, Input, input, OnChanges, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { map } from 'rxjs';
import { TrailItem } from 'src/app/models/trail-item';

@Component({
  selector: 'app-trail-progress',
  templateUrl: './trail-progress.component.html',
  styleUrls: ['./trail-progress.component.scss'],
  queries: {
    listOverlayPanel: new ViewChildren('overlayPanel')
  }
})
export class TrailProgressComponent implements OnInit, OnChanges {

  title = input('Aprenda o básico sobre frações');

  @ViewChildren('trailItem')
  listTrailItems: QueryList<ElementRef<HTMLLIElement>> = new QueryList();

  listOverlayPanel!: QueryList<OverlayPanel>;

  inverse = input(false);

  @Input()
  items?: TrailItem[];

  itemsIverse: TrailItem[] = [
    { id: 6, disabled: true, icon: 'fa-solid fa-book' },
    { id: 7, disabled: true },
    { id: 8, disabled: true },
    { id: 9, disabled: true },
    { id: 10, disabled: true, icon: 'fa-solid fa-trophy' }
  ];

  router = inject(Router);

  changeDetectorRef = inject(ChangeDetectorRef);

  scrollChanged = input(false);

  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit(): void {
    this.router.events.pipe(map(project => project instanceof NavigationEnd))
      .subscribe(() => this.changeDetectorRef.detectChanges());

    if (this.inverse()) {
      this.items = this.itemsIverse;
    }
  }

  ngOnChanges(): void {
    if (this.scrollChanged()) {
      this.listOverlayPanel?.forEach(overlayPanel => overlayPanel.hide());
    }
  }

  disabledStyleClass(item: TrailItem) {
    return {
      'progress__item--disabled': item?.disabled ?? false
    }
  }

  startLesson(itemId: number) {
    this.router.navigate([`/learning/trail/${itemId}`]);
  }

  // startLesson(overlayPanel: OverlayPanel, itemId: number) {
  //   this.router.navigate([`/learning/trail/${itemId}`]);
  //   overlayPanel.hide();
  // }

}
