import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrier } from '../entity/carrier';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getCarriers(): Observable<Carrier[]>{
    return this.http.get<Carrier[]>(`${this.apiBaseUrl}/carrier`);
  }
}
