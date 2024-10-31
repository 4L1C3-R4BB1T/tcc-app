import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStatistics } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {

  constructor(readonly http: HttpClient) { }

  create(): Observable<UserStatistics> {
    return this.http.post<UserStatistics>(`${environment.apiUrl}/statistics/create`, null);
  }

  updateStatistics(data: Partial<UserStatistics>): Observable<UserStatistics> {
    return this.http.put<UserStatistics>(`${environment.apiUrl}/statistics/update`, data);
  }

  findByUser(): Observable<UserStatistics> {
    return this.http.get<UserStatistics>(`${environment.apiUrl}/statistics/user`);
  }

}
