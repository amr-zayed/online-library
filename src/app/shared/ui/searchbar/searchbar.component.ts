import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  categories = ['Title', 'Subject', 'Author'];
  isCategoriesOpened: boolean = false;
  searchQuery: string = '';
  clickedCategories: boolean = false;
  selectedCategory: string = 'Title';

  toggleIsCategoriesOpened() {
    this.isCategoriesOpened = !this.isCategoriesOpened;
    this.clickedCategories = true;
  }
  updateCategory(inputCategory: string) {
    this.selectedCategory = inputCategory;
    this.isCategoriesOpened = false;
  }

  submitSearch() {
    console.log(this.selectedCategory);
    console.log(this.searchQuery);
  }
  @HostListener('document:click')
  clickout() {
    if (!this.clickedCategories) {
      this.isCategoriesOpened = false;
    }
    this.clickedCategories = false;
  }
}
