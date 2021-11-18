import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Figurine } from '../entity/figurine';

@Injectable({
  providedIn: 'root'
})
export class FigurineService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getFigurines(): Observable<Figurine[]>{
    return this.http.get<Figurine[]>(`${this.apiBaseUrl}/figurines`);
  }

  public getFigurine(figurineId: number): Observable<Figurine[]>{
    return this.http.get<Figurine[]>(`${this.apiBaseUrl}/figurines/id/${figurineId}`);
  }

  public addFigurine(figurine: Figurine): Observable<Figurine>{
    return this.http.post<Figurine>(`${this.apiBaseUrl}/figurine/add`, figurine);
  }

  public updateFigurine(figurine: Figurine): Observable<Figurine>{
    return this.http.put<Figurine>(`${this.apiBaseUrl}/figurine/edit`, figurine);
  }

  public deleteFigurine(figurineId: number): Observable<void> {
     return this.http.delete<void>(`${this.apiBaseUrl}/figurine/remove/${figurineId}` );
  }
}
