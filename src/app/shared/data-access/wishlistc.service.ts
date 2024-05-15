import { Injectable } from '@angular/core';
import { BookRouter, miniBook } from '../utils/dataTypes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistcService {
  wishlist: BookRouter[] = [];

  constructor(private http: HttpClient) {}

  WishlistBookremoveOrAdd(book: miniBook): Observable<boolean> {
    return this.http
      .get<BookRouter[]>(`${environment.mockServer}wishlist`)
      .pipe(
        switchMap(wishlist => {
          const tempWishlist = wishlist.filter(
            wishBook => wishBook.id === book.id
          );

          if (tempWishlist.length === 0) {
            return this.http
              .post(`${environment.mockServer}wishlist`, JSON.stringify(book), {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .pipe(map(() => true));
          } else {
            return this.http
              .delete(
                `${environment.mockServer}wishlist/${encodeURIComponent(book.id)}`
              )
              .pipe(map(() => false));
          }
        })
      );
  }

  getWishlist() {
    return this.http.get<miniBook[]>(`${environment.mockServer}wishlist`);
  }
}
