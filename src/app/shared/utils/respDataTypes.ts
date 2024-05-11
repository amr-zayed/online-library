import { Author } from './dataTypes';

export interface SubjectsResp {
  numFound: number;
  q: string;
  docs: SubjectsRespDoc[];
}

export interface SubjectsRespDoc {
  key: string;
  title: string;
  author_name: string[];
  number_of_pages_median: number;
  author_key: string[];
  first_publish_year: number;
  edition_count: number;
  cover_i: number;
  lccn: string[];
  isbn: string[];
  oclc: string[];
}

export interface AuthorArrResp {
  docs: Author[];
}
