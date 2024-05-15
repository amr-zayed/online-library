import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError } from 'rxjs';
import { SubjectsResp, SubjectsRespDoc } from './../utils/respDataTypes';
import { miniBook } from '../utils/dataTypes';
import handleError from '../utils/functions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooksBySubject(subject: string): Observable<miniBook[]> {
    const booksBySubjectUrl = `${environment.apiUrl}search.json?q=subject:${subject}&limit=15`;
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,OPTIONS,DELETE,PUT'
    );
    headers = headers.set('responseType', 'text');

    return this.http.get<SubjectsResp>(booksBySubjectUrl, { headers }).pipe(
      map(subjectsresponse => {
        const booksArrLen = subjectsresponse.docs.length;
        const booksArr: miniBook[] = [];

        for (let i = 0; i < booksArrLen; i += 1) {
          if (
            subjectsresponse.docs[i]['isbn'] ||
            subjectsresponse.docs[i]['lccn']
          ) {
            booksArr.push(this.parsebook(subjectsresponse.docs[i]));
          }
          if (booksArr.length === 9) {
            return booksArr;
          }
        }
        return booksArr;
      }),
      catchError(handleError('getBooksBySubject', []))
    );
  }

  getBooksBytitle(query: string): Observable<miniBook[]> {
    const booksByTitleUrl = `${environment.apiUrl}search.json?q=title:${query}&limit=15`;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,OPTIONS,DELETE,PUT'
    );
    headers = headers.set('responseType', 'text');

    return this.http.get<SubjectsResp>(booksByTitleUrl, { headers }).pipe(
      map(subjectsresponse => {
        const booksArrLen = subjectsresponse.docs.length;
        const booksArr = [];

        for (let i = 0; i < booksArrLen; i += 1) {
          if (
            subjectsresponse.docs[i]['isbn'] ||
            subjectsresponse.docs[i]['lccn']
          ) {
            booksArr.push(this.parsebook(subjectsresponse.docs[i]));
          }
          if (booksArr.length === 9) {
            return booksArr;
          }
        }
        return booksArr;
      }),
      catchError(handleError('getBooksBytitleandID', []))
    );
  }

  getBookBytitleAndId(
    title: string,
    id: string,
    idType: 'isbn' | 'lccn'
  ): Observable<miniBook | null> {
    const bookByTitleUrl = `${environment.apiUrl}search.json?title=${encodeURIComponent(title)}&limit=9`;
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,OPTIONS,DELETE,PUT'
    );
    headers = headers.set('responseType', 'text');

    return this.http.get<SubjectsResp>(bookByTitleUrl, { headers }).pipe(
      map(books => {
        const booksArrLen = books.docs.length;
        for (let i = 0; i < booksArrLen; i += 1) {
          if (books.docs[i][idType] && books.docs[i][idType].at(-1) === id) {
            return this.parsebook(books.docs[i]);
          }
        }
        return null;
      }),
      catchError(handleError('getBooksBytitleandID', null))
    );
  }

  private parsebook(book: SubjectsRespDoc) {
    const names: { name: string; id: string }[] = [];
    for (let i = 0; i < book.author_name.length; i += 1) {
      names.push({ name: book.author_name[i], id: book.author_key[i] });
    }

    return {
      id: book.isbn ? `isbn/${book.isbn.at(-1)}` : `lccn${book.lccn.at(-1)}`,
      cover_img: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : '',
      first_publish_year: book.first_publish_year,
      title: book.title,
      authors: names,
      edition_count: book.edition_count,
      number_of_pages: book.number_of_pages_median,
    };
  }
}
