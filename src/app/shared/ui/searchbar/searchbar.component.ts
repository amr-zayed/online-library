import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent implements OnInit {
  categories = ['Title', 'Subject', 'Author'];
  isCategoriesOpened: boolean = false;
  searchQuery: string = '';
  clickedCategories: boolean = false;
  selectedCategory: string = 'Title';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          if (e.urlAfterRedirects.split('/').at(1) === 'search') {
            this.searchQuery = decodeURIComponent(
              e.urlAfterRedirects.split('/').at(-1) as string
            );
            this.selectedCategory = e.urlAfterRedirects
              .split('/')
              .at(-2) as string;
          }
        }
      });
  }

  toggleIsCategoriesOpened() {
    this.isCategoriesOpened = !this.isCategoriesOpened;
    this.clickedCategories = true;
  }
  updateCategory(inputCategory: string) {
    this.selectedCategory = inputCategory;
    this.isCategoriesOpened = false;
  }

  submitSearch() {
    this.router.navigate(
      [`search/${this.selectedCategory}/${this.searchQuery}`],
      {
        relativeTo: this.route,
      }
    );
  }
  @HostListener('document:click')
  clickout() {
    if (!this.clickedCategories) {
      this.isCategoriesOpened = false;
    }
    this.clickedCategories = false;
  }
}
