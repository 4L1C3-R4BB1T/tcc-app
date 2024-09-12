import { ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { map } from 'rxjs';

export type TrailItem = {
  id: number;
  disabled?: boolean;
  position?: number;
  start?: boolean;
  action: () => void;
}

@Component({
  selector: 'app-trail-progress',
  templateUrl: './trail-progress.component.html',
  styleUrls: ['./trail-progress.component.scss'],
})
export class TrailProgressComponent implements OnInit, OnDestroy {

  @ViewChildren('tailItem')
  listTailItems: QueryList<ElementRef<HTMLLIElement>> = new QueryList();

  items: TrailItem[] = [
    {
      id: 1,
      action() {
        window.alert('Clicked');
      }
    },
    {
      id: 2,
      action() { },
      disabled: true,
    },
    {
      id: 3,
      action() { },
      disabled: true,
    },
    {
      id: 4,
      action() { },
      disabled: true,
    }
  ];

  router = inject(Router);

  changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.router.events.pipe(map(project => project instanceof NavigationEnd))
      .subscribe(() => this.changeDetectorRef.detectChanges());
  }


  ngAfterViewInit(): void {
      // *
      // **
      // **
  }

  ngOnDestroy(): void {
      console.log('oi')
  }

  disabledStyleClass(item: TrailItem) {
    return {
      'progress__item--disabled': item?.disabled ?? false
    }
  }

}
