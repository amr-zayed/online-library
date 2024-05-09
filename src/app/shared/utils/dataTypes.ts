export interface miniBook {
  id: string;
  title: string;
  cover_img: string;
  first_publish_year: number;
  authors: { name: string; id: string }[];
}
