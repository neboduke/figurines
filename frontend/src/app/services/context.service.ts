import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Context } from '../entity/context';


@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private apiBaseUrl = environment.apiUrls.context;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getContext(): Observable<Context[]>{
    return this.http.get<Context[]>(`${this.apiBaseUrl}`);
  }
}
