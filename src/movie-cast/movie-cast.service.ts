import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieCastDto } from './dto/create-movie-cast.dto';
import { UpdateMovieCastDTO } from './dto/update-movie-cast.dt';
import { MovieCast } from './movie-cast.entity';

@Injectable()
export class MovieCastService {
  constructor(
    @InjectRepository(MovieCast)
    private movieCastRepository: Repository<MovieCast>,
  ) {}

  getMovieCast(
    movieId: number,
    castId: number,
    skip: number,
    take: number,
  ): Promise<MovieCast[]> {
    const where = {};
    if (movieId) {
      where['movieId'] = movieId;
    } 
    if (castId) {
      where['castId'] = castId;
    }
    return this.movieCastRepository.find({
      where,
      skip,
      take,
    })
  }

  async create(bodyDTO: CreateMovieCastDto[]): Promise<MovieCast[]> {
    // const pushedCreates = [];
    // for (let i = 0; i < bodyDTO.length; i += 1) {
    //   const body = bodyDTO[i];
    //   const movieCast = new MovieCast();
    //   movieCast.movieId = body.movieId
    //     ? body.movieId
    //     : null;
    //   movieCast.castId = body.castId
    //     ? body.castId
    //     : null;

    //   const creating = this.movieCastRepository.create(
    //     movieCast,
    //   );
    //   pushedCreates.push(await creating.save());
    // }

    // return Promise.all(pushedCreates).then((result) => {
    //   return result
    // });
    return;
  }

  async updateMovieCast(
    id: number,
    body: UpdateMovieCastDTO
  ): Promise<MovieCast> {
  //   const movieCast = await this.movieCastRepository.findOne({
  //     where: { id: id },
  //   });

  //   if (!movieCast) {
  //     throw new HttpException(
  //       `id not found`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //    movieCast.movieId = body.movieId
  //     ? body.movieId
  //     : movieCast.movieId;
  //    movieCast.castId = body.castId
  //     ? body.castId
  //     : movieCast.castId;

  //   return await movieCast.save();
  // }
  return;
}
}