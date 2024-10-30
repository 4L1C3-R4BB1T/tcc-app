import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Achievement, AchievementIcon } from '../models/achievement';

@Injectable({
  providedIn: 'root',
})
export class AchievementService {

  constructor(readonly http: HttpClient) { }

  findAll(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${environment.apiUrl}/achievements`).pipe(first());
  }

  findByUser(): Observable<AchievementIcon[]> {
    return this.http.get<AchievementIcon[]>(`${environment.apiUrl}/achievements/user`).pipe(first());
  }

}
