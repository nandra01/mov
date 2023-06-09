import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { CreateMovieCastDto } from "src/movie-cast/dto/create-movie-cast.dto";
import { StatusMovie } from "../movie.enum";

@Injectable()
export class CreateMoviesDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  language: string;

  @ApiProperty({ required: true })
  status: string;

  @ApiProperty({description:'rate cannot be greater than 5' ,required: true })
  rating: number;

  @ApiProperty({ enum: StatusMovie, enumName: 'statusMovie'})
  statusMovie: StatusMovie

  @ApiProperty({
  type: [CreateMovieCastDto],
  })
  MovieCast:[CreateMovieCastDto];
}
