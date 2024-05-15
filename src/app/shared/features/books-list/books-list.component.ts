import { Component, EventEmitter, Input, Output } from '@angular/core';
import { miniBook } from '../../utils/dataTypes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistcService } from './../../data-access/wishlistc.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
})
export class BooksListComponent {
  booksList: miniBook[] | null = null;
  @Input() set _BooksList(books: miniBook[] | null) {
    this.booksList = books;
  }

  @Input() IsWishlist: boolean = false;
  @Output() WishlistRemove: EventEmitter<miniBook> = new EventEmitter();

  constructor(private wishlistServices: WishlistcService) {}

  removeFromWishlist(book: miniBook) {
    this.WishlistRemove.emit(book);
  }

  WishlistAddRemove(book: miniBook) {
    this.wishlistServices.WishlistBookremoveOrAdd(book).subscribe();
  }
}
