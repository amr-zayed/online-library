import { Component } from '@angular/core';
import { WishlistcService } from '../shared/data-access/wishlistc.service';
import { miniBook } from '../shared/utils/dataTypes';
import { BooksListComponent } from '../shared/features/books-list/books-list.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [BooksListComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  wishlistBooks: miniBook[] | null = null;
  constructor(private wishlistServices: WishlistcService) {}
  ngOnInit() {
    this.wishlistServices.getWishlist().subscribe(wishlist => {
      this.wishlistBooks = wishlist;
    });
  }

  handleWishlisht(book: miniBook) {
    this.wishlistServices.WishlistBookremoveOrAdd(book).subscribe(_ => {
      this.wishlistServices.getWishlist().subscribe(wishlist => {
        this.wishlistBooks = wishlist;
      });
    });
  }
}
