import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError } from 'rxjs';
import { map } from 'rxjs/operators';

import handleError from './../utils/functions';
import { AuthorArrResp } from '../utils/respDataTypes';
import { Author } from '../utils/dataTypes';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}
  getAuthorById(name: string, id: string) {
    const authorByIdUrl = `${environment.apiUrl}search/authors.json?q=${name}`;
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,OPTIONS,DELETE,PUT'
    );

    return this.http.get<AuthorArrResp>(authorByIdUrl, { headers }).pipe(
      map(authors => {
        for (let i = 0; i < authors.docs.length; i += 1) {
          if (id === authors.docs[i].key) {
            let tempAuth: Author = authors.docs[i];
            tempAuth.image = `https://covers.openlibrary.org/a/olid/${tempAuth.key}-L.jpg`;
            console.log(tempAuth);
            return tempAuth;
          }
        }
        return null;
      }),
      catchError(handleError('getBooksBySubject', null))
    );
  }
}
