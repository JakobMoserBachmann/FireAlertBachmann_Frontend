import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private PEOPLE_URL: string = environment.backendUrl + '/people/';

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    responseType: 'json' as const,
  };

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http
      .get<Person[]>(this.PEOPLE_URL)
      .pipe(catchError(this.handleError<Person[]>()));
  }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
