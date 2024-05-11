import { Component, Input } from '@angular/core';
import { BooksService } from '../../data-access/books.service';
import { miniBook } from '../../utils/dataTypes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
})
export class BooksListComponent {
  booksList: miniBook[] | null = [];
  @Input() set _BooksList(books: miniBook[] | null) {
    this.booksList = books;
  }
}
