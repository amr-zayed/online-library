export interface miniBook {
  id: string;
  title: string;
  cover_img: string;
  first_publish_year: number;
  edition_count: number;
  number_of_pages: number;
  authors: { name: string; id: string }[];
}

export interface Author {
  birth_date: string;
  name: string;
  key: string;
  top_work: string;
  work_count: number;
  top_subjects: string[];
  image: string;
}

export interface AuthorMini {
  name: string;
  key: string;
  image: string;
}

export interface BookRouter {
  name: string;
  id: string;
  idType: 'isbn' | 'lccn';
}
