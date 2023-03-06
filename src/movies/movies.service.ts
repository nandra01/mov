import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { MovieResponsesDTO } from './dto/responses/movies-responses';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movies } from './movies.entity';
import { QRCode } from 'qrcode';
import { CreateQrCodeDTO } from './dto/create-qr-code.dto';
import { Repository } from 'typeorm';
import dataSource from 'src/config/typeorm-migration';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
  ) {}

  // async getAllMovie(
  //   skip: number,
  //   take: number,
  //   title?: string,
  // ): Promise<MovieResponsesDTO> {
  //   const movieRepo = dataSource.getRepository(Movies);
  //   const qb = movieRepo.createQueryBuilder('movie');
  //   const qbTitle = await movieRepo.createQueryBuilder('movie').getCount();

  //   let totalMovie = 0;

  //   if (title) {
  //     qb.andWhere('movie.name like :title', { title: `%${title.trim()}%` });
  //   }
  //   if (!title) {
  //     totalMovie = qbTitle;
  //   }

  //   const qbMovies = await qb
  //     // .leftJoinAndSelect('movie.movieCasts', 'movieCasts')
  //     // .leftJoinAndSelect('movieCasts.cast', 'cast')
  //     .skip(skip)
  //     .take(take)
  //     .getMany();

  //   const moviesResponses = new MovieResponsesDTO();
  //   moviesResponses.totalMovie = totalMovie;
  //   moviesResponses.movies = qbMovies;

  //   return moviesResponses;
  // }

  async getMovie(): Promise<Movies[]> {
    const result = await this.movieRepository.find();

    return result;
  }

  async getMovieById(id: number): Promise<Movies> {
    const movieRepo = dataSource.getRepository(Movies);
    const qb = movieRepo
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.movieCasts', 'movieCasts')
      .leftJoinAndSelect('movieCasts.cast', 'cast');
    const res = await qb.where(`movie.id = :movieId`, { movieId: id }).getOne();
    console.log(
      '🚀 ~ file: movies.service.ts:59 ~ MoviesService ~ getMovieById ~ res:',
      res,
    );
    return res;
  }

  createMovie(movieDto: CreateMoviesDto): Promise<Movies> {
    const movie = new Movies();
    movie.name = movieDto.name;
    movie.language = movieDto.language;
    movie.status = movieDto.status;
    movie.rating = movieDto.rating;

    if (movie.rating > 5) {
      throw new HttpException(
        `Rate cannot be greater than 5`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return this.movieRepository.save(movie);
  }

  async update(id: number, updateMovieDTO: UpdateMovieDto): Promise<Movies> {
    // const currentMovie = await this.movieRepository.findOne({
    //   where: {
    //     id: id,
    //   },
    // });

    // if (!currentMovie) {
    //   throw new HttpException(`movie not found`, HttpStatus.NOT_FOUND);
    // }

    // currentMovie.name = updateMovieDTO.name;
    // currentMovie.language = updateMovieDTO.language;
    // currentMovie.status = updateMovieDTO.status;
    // currentMovie.rating = updateMovieDTO.rating;

    // if (currentMovie.rating > 5) {
    //   throw new HttpException(
    //     `Rate cannot be greater than 5`,
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }

    // return await currentMovie.save();
    return;
  }

  async delete(id: number) {
    const currentMovie = await this.movieRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!currentMovie) {
      throw new HttpException(`movie not found`, HttpStatus.NOT_FOUND);
    }
    return this.movieRepository.delete(id);
  }

  async getQr(id: number): Promise<string> {
    const movie = await this.movieRepository.findOneBy({ id });

    const qrcode = QRCode.toString(movie.name);
    return qrcode;
  }
}
