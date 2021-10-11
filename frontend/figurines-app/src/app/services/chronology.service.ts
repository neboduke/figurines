import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chronology } from '../entity/chronology';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChronologyService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getChronologies(): Observable<Chronology[]>{
    return this.http.get<Chronology[]>(`${this.apiServerUrl}/chronology`);
  }

  public addChronologies(chronology: Chronology): Observable<Chronology>{
    return this.http.post<Chronology>(`${this.apiServerUrl}/chronology/add`, chronology);
  }

  public updateChronologies(chronology: Chronology): Observable<Chronology>{
    return this.http.put<Chronology>(`${this.apiServerUrl}/chronology/update`, chronology);
  }

  public deleteChronologies(chronologyId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/chronology/remove/${chronologyId}`);
  }
}
