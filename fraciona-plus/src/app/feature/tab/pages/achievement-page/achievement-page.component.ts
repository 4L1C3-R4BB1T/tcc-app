import { Component, OnInit } from '@angular/core';

export type Achievement = {
  title: string;
  description: string;
  image: string;
  color: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-achievement-page',
  templateUrl: './achievement-page.component.html',
  styleUrls: ['./achievement-page.component.scss'],
})
export class AchievementPageComponent {

  achievements: Achievement[] = [
    {
      title: 'Primeiros Passos',
      description: 'Complete uma atividade',
      image: 'baby.png',
      color: '#39FF14'
    },
    {
      title: 'Racha Cuca',
      description: 'Complete um desafio',
      image: 'puzzle.png',
      color: '#39FF14'
    },
    {
      title: 'Genial',
      description: 'Complete uma atividade sem erros',
      image: 'brain.png',
      color: '#00BFFF'
    },
    {
      title: 'Desbravador',
      description: 'Complete 10 atividades',
      image: 'explorer.png',
      color: '#00BFFF'
    },
    {
      title: 'Focado',
      description: 'Estude por 7 dias consecutivos',
      image: 'marathon.png',
      color: '#00BFFF'
    },
    {
      title: 'Caixinha de Surpresas',
      description: 'Complete 1 desafio difícil',
      image: 'box.png',
      color: '#8A2BE2'
    },
    {
      title: 'Estrela da Festa',
      description: 'Complete 100 atividades sem erros',
      image: 'party.png',
      color: '#8A2BE2',
      disabled: true
    },
    {
      title: 'Mestre das Frações',
      description: 'Complete 200 atividades sem erros',
      image: 'wizard.png',
      color: '#8A2BE2',
      disabled: true
    },
  ];

}