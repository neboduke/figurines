import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from '../entity/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getMaterials(): Observable<Material[]>{
    return this.http.get<Material[]>(`${this.apiBaseUrl}/material`);
  }

 
}
