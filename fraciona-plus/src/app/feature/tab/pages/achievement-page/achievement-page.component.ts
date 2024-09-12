import { Component, OnInit } from '@angular/core';

export type Achievement = {
  title: string;
  description: string;
  image: string;
  color: string;
}

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.component.html',
  styleUrls: ['./achievement-page.component.scss'],
})
export class AchievementPageComponent {

  achievements: Achievement[] = [
    {
      title: 'Racha Cuca',
      description: 'Complete um desafio',
      image: 'puzzle.png',
      color: '#39FF14'
    },
    {
      title: 'Primeiros Passos',
      description: 'Complete uma atividade',
      image: 'baby.png',
      color: '#39FF14'
    },
    {
      title: 'Genial',
      description: 'Complete uma atividade sem erros',
      image: 'brain.png',
      color: '#8A2BE2'
    },
    {
      title: 'Caixinha de Surpresas',
      description: 'Complete 1 desafio difícil',
      image: 'box.png',
      color: '#00BFFF'
    },
    {
      title: 'Estrela da Festa',
      description: 'Complete 100 atividades sem erros',
      image: 'party.png',
      color: '#8A2BE2'
    }
  ];

}
