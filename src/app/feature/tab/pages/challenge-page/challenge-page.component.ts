import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ViewDidEnter } from '@ionic/angular';
import { Challenge } from 'src/app/models/challenge';
import { ChallengeService } from './../../../../services/challenge.service';

@Component({
  selector: 'app-challenge-page',
  templateUrl: './challenge-page.component.html',
  styleUrls: ['./challenge-page.component.scss'],
})
export class ChallengePageComponent implements ViewDidEnter, OnInit {

  challenges = signal<Challenge[]>([]);

  formGroup!: FormGroup;

  stateOptions: any[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Fácil', value: 'easy' },
    { label: 'Médio', value: 'medium' },
    { label: 'Difícil', value: 'hard' }
  ];

  constructor(readonly challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      value: new FormControl('all')
    });
  }

  ionViewDidEnter(): void {
    this.challengeService.findAll().subscribe({
      next: (data) => this.challenges.set(data),
      error: (error) => console.error("Erro ao carregar conquistas:", error)
    });
  }

}
