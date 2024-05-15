import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from './../shared/data-access/author.service';
import { Author } from '../shared/utils/dataTypes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
})
export class AuthorComponent implements OnInit {
  author: Author | null = null;
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {}
  ngOnInit() {
    const authorId = this.route.snapshot.paramMap.get('id') as string;
    const authorName = this.route.snapshot.paramMap.get('name') as string;
    this.authorService
      .getAuthorById(authorName, authorId)
      .subscribe(author => (this.author = author));
  }
}
