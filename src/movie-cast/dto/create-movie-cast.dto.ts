import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class CreateMovieCastDto {
  @ApiProperty({ required: true })
  movieId: number;

  @ApiProperty({ required: true })
  castId: number;
}
