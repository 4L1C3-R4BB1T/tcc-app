import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemActivityComponent } from './components/item-activity/item-activity.component';

@Component({
  selector: 'app-learning-trail',
  templateUrl: './learning-trail.component.html',
  styleUrls: ['./learning-trail.component.scss'],
})
export class LearningTrailComponent implements OnInit {

  trailItemContent: any = [
    {
      id: 1,
      type: 'content',
      title: 'O que são frações?',
      content: '<span>Frações são uma forma de representar partes de um todo ou divisões de uma quantidade. Elas são compostas por dois números separados por uma linha: o numerador (parte superior) e o denominador (parte inferior).</span><span><strong>Numerador:</strong> indica quantas partes estamos considerando.</span><span><strong>Denominador:</strong> indica em quantas partes o todo foi dividido.</span><span>Por exemplo, na fração 2/3, o numerador é 2 e o denominador é 3.</span>',
      image: 'fraction.png'
    },
    {
      id: 2,
      type: 'activity',
      content: 'Que fração representa 1 parte da pizza?',
      image: 'pizza.png',
      alternatives: [
        { id: 1, label: '1/1' },
        { id: 2, label: '1/8' },
        { id: 3, label: '1/2' },
        { id: 4, label: '1/4' }
      ],
      correctId: 2
    },
    {
      id: 3,
      type: 'activity',
      content: 'Qual fração é equivalente a 1/3?',
      alternatives: [
        { id: 1, label: '2/3' },
        { id: 2, label: '3/3' },
        { id: 3, label: '2/6' },
        { id: 4, label: '3/6' }
      ],
      correctId: 3
    }
  ];

  itemId: number = 0;
  itemContent: any;

  @ViewChild(ItemActivityComponent)
  itemActivityComponent!: ItemActivityComponent;

  isAnswered = signal(false);

  disableButton = signal(false);

  constructor(readonly router: Router, readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'] as number;
    this.itemContent = this.trailItemContent[this.itemId - 1];
    this.disableButton.set(true);
  }

  checkAnswered() {
    this.isAnswered.set(true);
    this.itemActivityComponent.canMark.set(true);
  }

  return() {
    this.itemActivityComponent.selectedAnswerId = null;
    this.itemActivityComponent.isAnswered.set(false);
    this.itemActivityComponent.canMark.set(false);
    this.isAnswered.set(false);
    this.router.navigate(['/tabs/learn']);
  }

}
