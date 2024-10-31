import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRanking } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RankingService {

  constructor(readonly http: HttpClient) { }

  findAll(): Observable<UserRanking[]> {
    return this.http.get<UserRanking[]>(`${environment.apiUrl}/ranking`).pipe(first());
  }

  findByUser(): Observable<UserRanking> {
    return this.http.get<UserRanking>(`${environment.apiUrl}/ranking/user`).pipe(first());
  }

}
