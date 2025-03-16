export enum BookGenre {
  DRAMA = "Drama",
  FANTASY = "Fantasy",
  BUSINESS = "Business",
  DETECTIVE = "Detective",
  EDUCATION = "Education",
  PSYCHOLOGY = "Psychology",
}
export interface BookInterface {
  _id: string;
  isbn: string;
  copies: number;
  title: string;
  authors: string[];
  genres: BookGenre[];
  pages: number;
  summary: string;
  coverImageUrl: string;
  rating: number;
}
