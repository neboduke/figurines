import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chronology } from '../entity/chronology';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChronologyService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getChronologies(): Observable<Chronology[]>{
    return this.http.get<Chronology[]>(`${this.apiBaseUrl}/chronology`);
  }

  public addChronologies(chronology: Chronology): Observable<Chronology>{
    return this.http.post<Chronology>(`${this.apiBaseUrl}/chronology/add`, chronology);
  }

  public updateChronologies(chronology: Chronology): Observable<Chronology>{
    return this.http.put<Chronology>(`${this.apiBaseUrl}/chronology/update`, chronology);
  }

  public deleteChronologies(chronologyId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiBaseUrl}/chronology/remove/${chronologyId}`);
  }
}
