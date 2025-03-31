import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Figurine } from '../entity/figurine';

@Injectable({
  providedIn: 'root'
})
export class FigurineService {

  private apiBaseUrl = environment.apiUrls.figurine;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getFigurines(): Observable<Figurine[]>{
    return this.http.get<Figurine[]>(`${this.apiBaseUrl}`);
  }

  public getFigurine(figurineId: number): Observable<Figurine>{
    return this.http.get<Figurine>(`${this.apiBaseUrl}/id/${figurineId}`);
  }

  public getFigurineCatNr(cnr: number): Observable<Figurine>{
    return this.http.get<Figurine>(`${this.apiBaseUrl}/cnr/${cnr}`);
  }

  public addFigurine(figurine: Figurine): Observable<Figurine>{
    return this.http.post<Figurine>(`${this.apiBaseUrl}/add`, figurine);
  }

  public updateFigurine(figurine: Figurine): Observable<Figurine>{
    return this.http.put<Figurine>(`${this.apiBaseUrl}/edit`, figurine);
  }

  public deleteFigurine(figurineId: number): Observable<void> {
     return this.http.delete<void>(`${this.apiBaseUrl}/remove/${figurineId}` );
  }
}
