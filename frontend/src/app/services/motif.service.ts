import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Motif } from '../entity/motif';

@Injectable({
  providedIn: 'root'
})
export class MotifService {

  private apiBaseUrl = environment.apiUrls.motif;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getMotifs(): Observable<Motif[]>{
    return this.http.get<Motif[]>(`${this.apiBaseUrl}`);
  }

}