import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { CreateMovieCastDto } from "src/movie-cast/dto/create-movie-cast.dto";
import { StatusMovie } from "../movie.enum";

@Injectable()
export class CreateMoviesDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  language: string;

  @ApiProperty({ required: false })
  status: string;

  @ApiProperty({description:'rate cannot be greater than 5' ,required: false })
  rating: number;

  @ApiProperty({ enum: StatusMovie, enumName: 'statusMovie'})
  statusMovie: StatusMovie

  @ApiProperty({description:'posible values "Published" | "Draft" ' ,required: false })
  updateStatus: string;

  // @ApiProperty({
  // type: [CreateMovieCastDto],
  // })
  // MovieCast:[CreateMovieCastDto];
}
