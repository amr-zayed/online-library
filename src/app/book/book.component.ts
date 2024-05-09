import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    const authorId = this.route.snapshot.paramMap.get('id') as string;
    const idType = this.route.snapshot.paramMap.get('type') as string;
    console.log(authorId);
    console.log(idType);
  }
}
