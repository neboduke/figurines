import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Literature } from '../entity/literature';

@Injectable({
  providedIn: 'root'
})
export class LiteratureService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getLiterature(): Observable<Literature[]>{
    return this.http.get<Literature[]>(`${this.apiBaseUrl}/literature`);
  }

  public addLiterature(literature: Literature): Observable<Literature>{
    return this.http.post<Literature>(`${this.apiBaseUrl}/literature/add`, literature);
  }

  public updateLiterature(literature: Literature): Observable<Literature>{
    return this.http.put<Literature>(`${this.apiBaseUrl}/literature/edit`, literature);
  }

  public deleteLiterature(literatureId: number): Observable<void> {
     return this.http.delete<void>(`${this.apiBaseUrl}/literature/remove/${literatureId}` );
  }
}
