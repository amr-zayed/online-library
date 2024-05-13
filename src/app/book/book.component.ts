import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../shared/data-access/books.service';
import { miniBook } from '../shared/utils/dataTypes';
import { CommonModule } from '@angular/common';
import { WishlistcService } from '../shared/data-access/wishlistc.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  book: miniBook | null = null;
  constructor(
    private route: ActivatedRoute,
    private booksServices: BooksService,
    private wishlistServices: WishlistcService
  ) {}
  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name') as string;
    const bookId = this.route.snapshot.paramMap.get('id') as string;
    const idType = this.route.snapshot.paramMap.get('type') as 'isbn' | 'lccn';

    this.booksServices
      .getBookBytitleAndId(name, bookId, idType)
      .subscribe(bookResp =>
        bookResp !== null ? (this.book = bookResp) : null
      );
  }

  AddRemoveFromWhishlist() {
    if (this.book)
      this.wishlistServices.WishlistBookremoveOrAdd(this.book).subscribe();
  }
}
