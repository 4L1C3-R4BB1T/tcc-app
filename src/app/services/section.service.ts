import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item, Section } from '../models/sections';

@Injectable({
  providedIn: 'root',
})
export class SectionService {

  constructor(readonly http: HttpClient) { }

  findById(id: number): Observable<Section> {
    return this.http.get<Section>(`${environment.apiUrl}/sections/${id}`).pipe(first());
  }

  getItens(id: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.apiUrl}/sections/${id}/questions`).pipe(first());;
  }

  updateItem(sectionId: number, itemId: number, data: { completed?: boolean; disabled?: boolean; }) {
    return this.http.patch(`${environment.apiUrl}/sections/${sectionId}/questions/${itemId}`, data);
  }

}
