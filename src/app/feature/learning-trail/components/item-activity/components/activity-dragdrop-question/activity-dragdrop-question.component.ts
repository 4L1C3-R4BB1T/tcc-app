import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Question } from 'src/app/models/question';
import { ItemActivityComponent } from '../../item-activity.component';

@Component({
  selector: 'app-activity-dragdrop-question',
  templateUrl: './activity-dragdrop-question.component.html',
  styleUrls: ['./activity-dragdrop-question.component.scss'],
})
export class ActivityDragdropQuestionComponent implements OnInit {

  @Input({ required: true })
  data!: Question;

  parent = inject(ItemActivityComponent);

  droppedItems = signal<string[]>([]);

  isCorrect = signal<boolean>(false);

  constructor(readonly router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.url;
      if (currentRoute.startsWith('/learning/section/')) {
        this.droppedItems.set([]);
      }
    });
  }

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', this.data.label as string);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const item = event.dataTransfer?.getData('text/plain');
    if (item) {
      this.droppedItems().push(item);
    }
  }

  removeItem(item: string) {
    const currentItems = this.droppedItems();
    const updatedItems = currentItems.filter(droppedItem => droppedItem !== item);
    this.droppedItems.set(updatedItems);
  }

  get isCorrectDrop(): boolean {
    return this.droppedItems().length === this.data.correctQtt;
  }
}
