export interface SubjectsResp {
  numFound: number;
  q: string;
  docs: {
    key: string;
    title: string;
    author_name: string[];
    author_key: string[];
    first_publish_year: number;
    edition_count: number;
    cover_i: number;
    lccn: string[];
    isbn: string[];
    oclc: string[];
  }[];
}
