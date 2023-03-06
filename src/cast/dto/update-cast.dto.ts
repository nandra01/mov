import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class UpdateCastDTO {
    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: true })
    birthday: string;

    @ApiProperty({ required: true })
    deadday: Date;

    @ApiProperty({ required: true })
    rating: number;

    @ApiProperty({ required: true })
    address: string;
  }
  