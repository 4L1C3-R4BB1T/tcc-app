import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Challenge } from 'src/app/models/challenge';

@Component({
  selector: 'app-challenge-page',
  templateUrl: './challenge-page.component.html',
  styleUrls: ['./challenge-page.component.scss'],
})
export class ChallengePageComponent implements OnInit {

  challengers: Challenge[] = [
    {
      title: 'Quebra-Fração',
      difficulty: 3,
      exp: 30,
      image: 'puzzle.png'
    },
    {
      title: 'Primeiros Passos',
      difficulty: 1,
      exp: 10,
      image: 'baby.png'
    },
    {
      title: 'Mestre das Frações',
      difficulty: 2,
      exp: 40,
      image: 'wizard.png'
    },
    {
      title: 'Calculadora Humana',
      difficulty: 2,
      exp: 45,
      image: 'calculator.png'
    },
    {
      title: 'A Grande Fração',
      difficulty: 3,
      exp: 35,
      image: 'number.png'
    },
    {
      title: 'Conhecimento Sólido',
      difficulty: 1,
      exp: 10,
      image: 'stone.png'
    }
  ];

  formGroup!: FormGroup;

  stateOptions: any[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Fácil', value: 'easy' },
    { label: 'Médio', value: 'medium' },
    { label: 'Difícil', value: 'hard' }
  ];

  ngOnInit() {
    this.formGroup = new FormGroup({
      value: new FormControl('all')
    });
  }

}
