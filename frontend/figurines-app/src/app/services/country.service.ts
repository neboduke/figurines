import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../entity/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiBaseUrl}/country`);
  }

}
