import { Component } from '@angular/core';

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
export class TrailProgressComponent {

  items: TrailItem[] = [
    {
      id: 1,
      action() { }
    },
    {
      id: 4,
      action() { },
      disabled: true,
    }
  ];

}
