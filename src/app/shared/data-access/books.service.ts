import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { SubjectsResp } from './../utils/respDataTypes';
import { miniBook } from '../utils/dataTypes';
import handleError from '../utils/functions';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooksBySubject(subject: string): Observable<SubjectsResp | null> {
    const booksBySubjectUrl = `${environment.apiUrl}search.json?q=subject:${subject}&limit=9&offset=0`;
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,OPTIONS,DELETE,PUT'
    );

    return this.http
      .get<SubjectsResp>(booksBySubjectUrl, { headers })
      .pipe(catchError(handleError('getBooksBySubject', null)));
  }
}
