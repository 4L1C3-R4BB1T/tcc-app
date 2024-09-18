import { Component } from '@angular/core';
import { Achievement } from 'src/app/models/achievement';

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
      title: 'Grande Amigo',
      description: 'Participou do perído de testes do aplicativo',
      image: 'graduation.png',
      color: '#FF4500'
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
