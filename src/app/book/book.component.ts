import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../shared/data-access/books.service';
import { miniBook } from '../shared/utils/dataTypes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  book: miniBook | null = null;
  constructor(
    private route: ActivatedRoute,
    private booksServices: BooksService
  ) {}
  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name') as string;
    const authorId = this.route.snapshot.paramMap.get('id') as string;
    const idType = this.route.snapshot.paramMap.get('type') as 'isbn' | 'lccn';
    this.booksServices
      .getBookBytitleAndId(name, authorId, idType)
      .subscribe(bookResp =>
        bookResp !== null ? (this.book = bookResp) : null
      );
    console.log(authorId);
    console.log(idType);
    console.log(name);
  }
}
