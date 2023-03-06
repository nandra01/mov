import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { CreateMovieCastDto } from "src/movie-cast/dto/create-movie-cast.dto";

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

  @ApiProperty({
  type: [CreateMovieCastDto],
  })
  MovieCast:[CreateMovieCastDto];
}
