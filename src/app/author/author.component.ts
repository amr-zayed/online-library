import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
})
export class AuthorComponent {
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    const authorId = this.route.snapshot.paramMap.get('id') as string;
    console.log(authorId);
  }
}
