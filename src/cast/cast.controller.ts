import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Cast } from './cast.entity';
import { CastService } from './cast.service';
import { CreateCastDto } from './dto/create-cast.dto';
import { CastResponsesDTO } from './dto/responses/cast-responses.dto';
import { UpdateCastDTO } from './dto/update-cast.dto';

@ApiTags('casts')
@Controller('api/v1/cast')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @Get()
  @ApiQuery({ name: 'skip', description: 'for pagination', example: '0' })
  @ApiQuery({ name: 'take', description: 'for pagination', example: '10' })
  @ApiQuery({ name: 'name', required: false })
  async get(
    @Query('skip', new ParseIntPipe()) skip: number,
    @Query('take', new ParseIntPipe()) take: number,
    @Query('name') name?: string,
  ): Promise<CastResponsesDTO> {
    return this.castService.get(
      skip,
      take,
      name,
    );
  }

  @Get('/:id')
  async getCastById(@Param('id') id: number) {
    return this.castService.getCastById(id);
  }

  @Get('castName')
  async castName(@Req() req: Request) {
    const builder = await this.castService.getCastName('cast');

    if (req.query.cast_name) {
      builder.where('cast.name LIKE :cast_name', {
        cast_name: `%${req.query.cast_name}%`,
      });
    }
    return await builder.getMany();
  }

  @Post()
  async create(@Body() userDto: CreateCastDto) {
    return {
      data: await this.castService.create(userDto),
    };
  }

  @Put('/:id') 
  @ApiParam({ name: 'id' })
  async update(
    @Param('id') id: number,
    @Body() updateCastDTO: UpdateCastDTO,
  ): Promise<Cast> {
    return await this.castService.update(id, updateCastDTO);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: number) {
    return this.castService.delete(id);
  }
}
