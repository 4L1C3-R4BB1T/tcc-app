import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ActivityComponent } from '../../activity.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dragdrop-question',
  templateUrl: './dragdrop-question.component.html',
  styleUrls: ['./dragdrop-question.component.scss'],
})
export class DragdropQuestionComponent implements OnInit {

  @Input({ required: true })
  data!: Question;

  parent = inject(ActivityComponent);

  droppedItems = signal<string[]>([]);

  constructor(readonly router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.url;
      if (currentRoute.startsWith('/quiz/started')) {
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
