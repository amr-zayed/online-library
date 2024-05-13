import { Injectable } from '@angular/core';
import { BookRouter } from '../utils/dataTypes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistcService {
  wishlist: BookRouter[] = [];

  constructor(private http: HttpClient) {}

  WishlistBookremoveOrAdd(book: BookRouter): Observable<any> {
    return this.http
      .get<BookRouter[]>(`${environment.mockServer}wishlist`)
      .pipe(
        map(wishlist => {
          let tempWishlist = wishlist.filter(
            wishBook => wishBook.id === book.id
          );

          if (tempWishlist.length === 0) {
            this.http
              .post(`${environment.mockServer}wishlist`, JSON.stringify(book), {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .subscribe();
          } else {
            this.http
              .delete(`${environment.mockServer}wishlist/${book.id}`)
              .subscribe();
          }
        })
      );
  }

  getWishlist() {
    return this.http.get<BookRouter[]>(`${environment.mockServer}wishlist`);
  }
}
