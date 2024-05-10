export interface miniBook {
  id: string;
  title: string;
  cover_img: string;
  first_publish_year: number;
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
