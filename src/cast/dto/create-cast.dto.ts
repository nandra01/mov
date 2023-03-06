import { ApiProperty } from "@nestjs/swagger";

export class CreateCastDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  birthday: string;

  @ApiProperty({ required: true })
  deadday: Date;

  @ApiProperty({description:'rate cannot be greater than 5', required: true })
  rating: number;

  @ApiProperty({ required: true })
  address: string;
}
