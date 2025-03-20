import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from 'src/app/entity/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiBaseUrlLocations = environment.apiUrls.locations;
  private apiBaseUrl = environment.apiUrls.location;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(`${this.apiBaseUrlLocations}`);
  }

  public addLocation(location: Location): Observable<Location>{
    return this.http.post<Location>(`${this.apiBaseUrl}/add`, location);
  }

  public updateLocation(location: Location): Observable<Location>{
    return this.http.put<Location>(`${this.apiBaseUrl}/edit`, location);
  }

  public deleteLocation(locationId: number): Observable<void> {
     return this.http.delete<void>(`${this.apiBaseUrl}/remove/${locationId}` );
  }
}

