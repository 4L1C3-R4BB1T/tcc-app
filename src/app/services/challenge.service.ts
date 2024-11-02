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

  findAll(difficulty: number): Observable<Challenge[]> {
    const params = { difficulty: difficulty as number };
    return this.http.get<Challenge[]>(`${environment.apiUrl}/challenges`, { params }).pipe(first());
  }

  findById(id: string): Observable<Challenge> {
    return this.http.get<Challenge>(`${environment.apiUrl}/challenges/${id}`).pipe(first());
  }

}
