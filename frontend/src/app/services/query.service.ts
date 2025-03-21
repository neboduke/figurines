import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Query } from '../entity/query';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private apiBaseUrl = environment.apiUrls.query;

  constructor(private http: HttpClient) { console.log('---- CONSTRUCTOR SERVICE---')}

  public getQueries(): Observable<Query[]>{
    return this.http.get<Query[]>(`${this.apiBaseUrl}`);
  }

  public addQuery(query: Query): Observable<Query>{
    return this.http.post<Query>(`${this.apiBaseUrl}/add`, query);
  }

  public updateQuery(query: Query): Observable<Query>{
    return this.http.put<Query>(`${this.apiBaseUrl}/edit`, query);
  }

  public deleteQuery(queryId: number): Observable<void> {
     return this.http.delete<void>(`${this.apiBaseUrl}/remove/${queryId}` );
  }
}
