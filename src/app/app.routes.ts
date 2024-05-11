import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'authors/:name/:id', component: AuthorComponent },
  { path: 'books/:name/:type/:id', component: BookComponent },
  { path: 'search/:category/:query', component: SearchComponent },
];
