import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class UpdateMovieDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  language: string;

  @ApiProperty({ required: false })
  status: string;

  @ApiProperty({ required: false })
  rating: number;


  @ApiProperty({ required: false })
  updateStatus: string;
}