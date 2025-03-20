import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chronology } from '../entity/chronology';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChronologyService {

  private apiBaseUrl = environment.apiUrls.chronology;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getChronologies(): Observable<Chronology[]>{
    return this.http.get<Chronology[]>(`${this.apiBaseUrl}`);
  }

  public addChronology(chronology: Chronology): Observable<Chronology>{
    return this.http.post<Chronology>(`${this.apiBaseUrl}/add`, chronology);
  }

  public updateChronology(chronology: Chronology): Observable<Chronology>{
    return this.http.put<Chronology>(`${this.apiBaseUrl}/edit`, chronology);
  }

  public deleteChronology(chronologyId: number): Observable<void> {
     return this.http.delete<void>(`${this.apiBaseUrl}/remove/${chronologyId}` );
  }
}
