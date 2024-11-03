import { ChangeDetectorRef, Component, ElementRef, inject, Input, input, OnChanges, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { map } from 'rxjs';
import { Item } from 'src/app/models/sections';
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

  title = input('')

  listOverlayPanel!: QueryList<OverlayPanel>;

  inverse = input(false);

  @Input()
  items?: Item[];

  router = inject(Router);

  changeDetectorRef = inject(ChangeDetectorRef);

  scrollChanged = input(false);

  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input()
  sectionId: number | undefined = 0;

  ngOnInit(): void {
    this.router.events.pipe(map(project => project instanceof NavigationEnd))
      .subscribe(() => this.changeDetectorRef.detectChanges());
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

  startLesson(overlayPanel: OverlayPanel, sectionId: number | undefined, itemId: number) {
    this.router.navigate([`/learning/section/${sectionId}/item/${itemId}`]);
    overlayPanel.hide();
  }

}
