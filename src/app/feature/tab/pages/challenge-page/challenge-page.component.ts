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

  allChallenges = signal<Challenge[]>([]);

  formGroup!: FormGroup;

  stateOptions: any[] = [
    { label: 'Todos', value: 0 },
    { label: 'Fácil', value: 1 },
    { label: 'Médio', value: 2 },
    { label: 'Difícil', value: 3 }
  ];

  loading = signal<boolean>(true);

  constructor(readonly challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      value: new FormControl(0)
    });
  }

  ionViewDidEnter(): void {
    this.formGroup.get('value')?.setValue(0);

    this.loadChallenges();

    this.formGroup.get('value')?.valueChanges.subscribe((difficulty) => {
      this.filterChallenges(difficulty);
    });
  }

  private loadChallenges(): void {
    this.loading.set(true);
    this.challengeService.findAll().subscribe({
      next: (data) => {
        this.allChallenges.set(data);
        this.challenges.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Erro ao carregar desafios:", error);
        this.loading.set(false);
      }
    });
  }

  private filterChallenges(difficulty: number) {
    if (difficulty == null) return;

    if (difficulty == 0) {
      this.challenges.set(this.allChallenges());
    } else {
      this.challenges.set(this.allChallenges().filter(c => c.difficulty === difficulty));
    }
  }

}
