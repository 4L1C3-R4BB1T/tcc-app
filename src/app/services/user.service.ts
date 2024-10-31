import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(readonly http: HttpClient) { }

  delete(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/user/delete`);
  }

}
