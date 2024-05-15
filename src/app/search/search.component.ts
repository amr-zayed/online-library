import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { BooksService } from '../shared/data-access/books.service';
import { filter } from 'rxjs';
import { AuthorMini, miniBook } from '../shared/utils/dataTypes';
import { BooksListComponent } from '../shared/features/books-list/books-list.component';
import { AuthorService } from '../shared/data-access/author.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [BooksListComponent, CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private booksServices: BooksService,
    private authorService: AuthorService
  ) {}

  AuthorsList: AuthorMini[] | null = [];
  booksList: miniBook[] | null = null;
  category: string = '';
  query: string = '';
  ngOnInit() {
    this.search();
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.search());
  }

  private search() {
    const categoryUrl = this.route.snapshot.paramMap.get('category') as string;
    const queryUrl = this.route.snapshot.paramMap.get('query') as string;
    this.category = categoryUrl;
    this.query = decodeURIComponent(queryUrl);
    if (categoryUrl === 'Title') {
      this.booksServices
        .getBooksBytitle(queryUrl)
        .subscribe(books => (this.booksList = books));
    } else if (categoryUrl === 'Subject') {
      this.booksServices
        .getBooksBySubject(queryUrl)
        .subscribe(books => (this.booksList = books));
    } else {
      this.authorService
        .getAuthorsByName(queryUrl)
        .subscribe(authors => (this.AuthorsList = authors));
    }
  }
}
