import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Challenge } from '../models/challenge';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {

  constructor(readonly http: HttpClient) { }

  findAll(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${environment.apiUrl}/challenges`).pipe(first());
  }

  findById(id: string): Observable<Challenge> {
    return this.http.get<Challenge>(`${environment.apiUrl}/challenges/${id}`).pipe(first());
  }

  findByDifficulty(difficulty: number): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${environment.apiUrl}/challenges/difficulty/${difficulty}`);
  }

}
