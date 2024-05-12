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
  financeBooks: miniBook[] | null = null;
  constructor(private booksServices: BooksService) {}
  ngOnInit(): void {
    this.booksServices.getBooksBySubject('finance').subscribe(books => {
      if (books) {
        this.financeBooks = books;
      }
    });
  }
}
