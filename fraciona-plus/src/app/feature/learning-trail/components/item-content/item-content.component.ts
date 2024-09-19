import { Component, inject, Input, OnInit } from '@angular/core';
import { LearningTrailComponent } from '../../learning-trail.component';

@Component({
  selector: 'app-item-content',
  templateUrl: './item-content.component.html',
  styleUrls: ['./item-content.component.scss'],
})
export class ItemContentComponent implements OnInit {

  @Input({ required: true })
  data!: any;

  parent = inject(LearningTrailComponent);

  ngOnInit(): void {
    let div = document.getElementById('content') as any;
    div.innerHTML = this.data.content;
  }

}
