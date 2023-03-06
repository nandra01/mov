import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

@Injectable()
export class CreateQrCodeDTO {
  @ApiProperty({ required: false })
  text: string;
}
