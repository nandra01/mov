import { Movies } from "src/movies/movies.entity"

export class MovieResponsesDTO {
  totalMovie: number;
  movies: Movies[];
}