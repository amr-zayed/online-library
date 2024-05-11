import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError } from 'rxjs';
import { map } from 'rxjs/operators';

import handleError from './../utils/functions';
import { AuthorArrResp, AuthorSearchResp } from '../utils/respDataTypes';
import { Author, AuthorMini } from '../utils/dataTypes';

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
            return tempAuth;
          }
        }
        return null;
      }),
      catchError(handleError('getBooksBySubject', null))
    );
  }

  getAuthorsByName(query: string) {
    const authorsByNameUrl = `${environment.apiUrl}search.json?q=author:${query}&limit=9`;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,OPTIONS,DELETE,PUT'
    );

    return this.http.get<AuthorSearchResp>(authorsByNameUrl, { headers }).pipe(
      map(AuthorsResponse => {
        const AuthorsArrLen = AuthorsResponse.docs.length;
        let AuthorsArr: AuthorMini[] = [];
        for (let i = 0; i < AuthorsArrLen; i += 1) {
          AuthorsArr.push({
            name: AuthorsResponse.docs[i].author_name[0],
            key: AuthorsResponse.docs[i].author_key[0],
            image: `https://covers.openlibrary.org/a/olid/${AuthorsResponse.docs[i].author_key[0]}-M.jpg`,
          });
        }
        return AuthorsArr;
      }),
      catchError(handleError('getBooksBytitleandID', null))
    );
  }
}
