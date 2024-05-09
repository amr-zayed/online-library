import { Component } from '@angular/core';
import { BooksListComponent } from '../shared/features/books-list/books-list.component';
import { BooksService } from './../shared/data-access/books.service';
import { miniBook } from '../shared/utils/dataTypes';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [BooksListComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  financeBooks: miniBook[] = [];
  constructor(private booksServices: BooksService) {}
  ngOnInit(): void {
    this.booksServices.getBooksBySubject('finance').subscribe(books => {
      if (books) {
        this.financeBooks = books.docs.map(book => {
          let names: { name: string; id: string }[] = [];
          for (let i = 0; i < book.author_name.length; i += 1) {
            names.push({ name: book.author_name[i], id: book.author_key[i] });
          }
          return {
            id: book.isbn
              ? `isbn/${book.isbn[book.isbn.length - 1]}`
              : `lccn${book.lccn[book.lccn.length - 1]}`,
            cover_img: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : '',
            first_publish_year: book.first_publish_year,
            title: book.title,
            authors: names,
          };
        });
      }
    });
  }
}
