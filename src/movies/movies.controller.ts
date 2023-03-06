import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { MoviesService } from './movies.service';
import { Movies } from './movies.entity';
import { ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MovieResponsesDTO } from './dto/responses/movies-responses';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieCastDto } from 'src/movie-cast/dto/create-movie-cast.dto';
import { MovieCastService } from 'src/movie-cast/movie-cast.service';

@ApiTags('movies')
@Controller('api/v1/watch')
export class MoviesController {
  constructor(
    private readonly movieService: MoviesService,
    private readonly movieCastService: MovieCastService,
  ) {}

  // @Get()
  // @ApiQuery({ name: 'skip', description: 'for pagination', example: '0' })
  // @ApiQuery({ name: 'take', description: 'for pagination', example: '10' })
  // @ApiQuery({ name: 'title', required: false })
  // async allMovie(
  //   @Query('skip', new ParseIntPipe()) skip: number,
  //   @Query('take', new ParseIntPipe()) take: number,
  //   @Query('title') title?: string,
  // ): Promise<MovieResponsesDTO> {
  //   return this.movieService.getAllMovie(skip, take, title);
  // }

  @Get('/all')
  async get(): Promise<Movies[]> {
    return this.movieService.getMovie();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async createMovie(@Body() movieDto: CreateMoviesDto): Promise<Movies> {
    const movie = await this.movieService.createMovie(movieDto);

    if (movieDto.MovieCast) {
      const createMovieCastDTO: CreateMovieCastDto[] = JSON.parse(
        '[' + movieDto.MovieCast + ']',
      );
      createMovieCastDTO.forEach((data) => {
        Object.assign(data, { movieId: movie.id });
      });
      await this.movieCastService.create(createMovieCastDTO);
    }

    return movie;
  }

  @Post('/qrcode')
  @ApiParam({ name: 'id' })
  async createQr(@Param() id: number): Promise<string> {
    return await this.movieService.getQr(id);
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  async getMovieById(@Param('id') id: number): Promise<Movies> {
    return await this.movieService.getMovieById(id);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: number,
    @Body() updateMovieDTO: UpdateMovieDto,
  ): Promise<Movies> {
    //const movieCastCheck =

    return this.movieService.update(id, updateMovieDTO);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: number) {
    return this.movieService.delete(id);
  }
}
