import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'authors/:id', component: AuthorComponent },
  { path: 'books/:type/:id', component: BookComponent },
];
