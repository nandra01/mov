import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class UpdateMovieCastDTO {
  @ApiProperty({ required: true })
  movieId: number;

  @ApiProperty({ required: true })
  castId: number;
}