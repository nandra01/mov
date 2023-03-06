import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class UpdateMovieDto {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  language: string;

  @ApiProperty({ required: true })
  status: string;

  @ApiProperty({ required: true })
  rating: number;
}