import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { MovieResponsesDTO } from './dto/responses/movies-responses';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movies } from './movies.entity';
import { QRCode } from 'qrcode';
import { CreateQrCodeDTO } from './dto/create-qr-code.dto';
import { EntityManager, Repository } from 'typeorm';
import dataSource from 'src/config/typeorm-migration';
import { MoviesRepository } from './movie.repository';
import { ApiQuery } from '@nestjs/swagger';

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
    const qb = this.movieRepository
      .createQueryBuilder('movie')
      .select(['movie.id', 'movie.name', 'movie.language', 'movie.status', 'movie.rating', 'movie.updateStatus'])
      .leftJoin('movie.movieCasts', 'movieCasts')
      .leftJoin('movieCasts.cast', 'cast');
    const res = await qb.where(`movie.id = :movieId`, { movieId: id }).getOne();
    
    return res;
  }

  createMovie(movieDto: CreateMoviesDto): Promise<Movies> {
    const movie = new Movies();
    movie.name = movieDto.name;
    movie.language = movieDto.language;
    movie.status = movieDto.status;
    movie.rating = movieDto.rating ? movieDto.rating : 0;
    movie.updateStatus = movieDto.updateStatus ? movieDto.updateStatus : 'Published';

    // if (movie.rating > 5) {
    //   throw new HttpException(
    //     `Rate cannot be greater than 5`,
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }

    return this.movieRepository.save(movie);
  }

  // async update(id: number, updateMovieDTO: UpdateMovieDto, publishDraft = false): Promise<Movies> {
  //   const currentMovie = await this.movieRepository.findOne({ where: { id: id  }});
  //   const currentMoviePublish = await this.movieRepository.findOne({ where: { parentId: id, updateStatus: 'Draft' }});
  //   if (currentMoviePublish && updateMovieDTO.updateStatus !== 'Draft') {
  //     console.log('<<<<<MASUKKK DELETE ');
      
  //     await this.movieRepository.softDelete({ parentId: currentMovie.id });
  //   }
  //   if (!currentMovie) {
  //     throw new HttpException(`Movie not found`, HttpStatus.NOT_FOUND);
  //   }
  
  //   if (updateMovieDTO.updateStatus === 'Draft') {
  //     const hasMovieDraft = await this.movieRepository.findOne({ where: {parentId: id }})
  //     if (hasMovieDraft) {
  //       throw new HttpException(`this movie has already draft`, HttpStatus.CONFLICT);
  //     }
  //     console.log('<<<<<1. SIMPAN SEBAGAI DRAFT NO PUBLISH>>>>>');
  //     const movie = new Movies();
  //     movie.name = updateMovieDTO.name;
  //     movie.language = updateMovieDTO.language;
  //     movie.status = updateMovieDTO.status;
  //     movie.rating = updateMovieDTO.rating ? updateMovieDTO.rating : 0;
  //     movie.updateStatus = 'Draft'
  //     movie.parentId = currentMovie.id
  
  //    return this.movieRepository.save(movie);
  //   } 
  //    if (publishDraft && publishDraft.toString() == 'true') {
  //     // Find and update the corresponding draft

  //     const draftPublish = await this.movieRepository.findOne({ where: {id: id, updateStatus: 'Draft'}})
  //     if (draftPublish && !draftPublish.parentId) {
  //       console.log('<<<<<2. DRAFT LANGSUNG PUBLISH(TIDAK PUNYA PARENT_ID)>>>>>');
  //       currentMovie.name = updateMovieDTO.name ?? currentMovie.name;
  //       currentMovie.language = updateMovieDTO.language ?? currentMovie.language;
  //       currentMovie.status = updateMovieDTO.status ?? currentMovie.status;
  //       currentMovie.rating = updateMovieDTO.rating ?? currentMovie.rating;
  //       currentMovie.updateStatus = 'Published';
  //       // Save the changes to the current movie (either the original or the draft)
  //        await currentMovie.save();
  //        return currentMovie
  //     }
  //     const publishMovieId = await this.movieRepository.findOne({
  //       where: { id: currentMovie.parentId }
  //     })

  //     if (!publishMovieId) {
  //       throw new NotFoundException(`Draft not found`);
  //     }
  //     console.log('<<<<<3. DRAFT LANGSUNG PUBLISH(PUNYA PARENT_ID)>>>>>');
  //     publishMovieId.name = updateMovieDTO.name;
  //     publishMovieId.language = updateMovieDTO.language;
  //     publishMovieId.status = updateMovieDTO.status;
  //     publishMovieId.rating = updateMovieDTO.rating;
  
      
  //     await publishMovieId.save();
  //     // Soft-delete the draft
  //     await this.movieRepository.softDelete(currentMovie.id);
  
  //     return publishMovieId;
  //   } 

  //   console.log('<<<<<4. UPDATE BIASA(DIRECT KE ID NYA)>>>>>');
  //   currentMovie.name = updateMovieDTO.name ?? currentMovie.name;
  //   currentMovie.language = updateMovieDTO.language ?? currentMovie.language;
  //   currentMovie.status = updateMovieDTO.status ?? currentMovie.status;
  //   currentMovie.rating = updateMovieDTO.rating ?? currentMovie.rating;
  //   if (updateMovieDTO.updateStatus === 'Draft') { 
  //     const hasMovieDraft = await this.movieRepository.findOne({ where: {parentId: id }})
  //     if (hasMovieDraft) {
  //       throw new HttpException(`this movie has already draft`, HttpStatus.CONFLICT);
  //     }
  //    return this.movieRepository.save(currentMovie);
  //   }
  //   // Save the changes to the current movie (either the original or the draft)
  //   return await currentMovie.save();
  // }
  async update(id: number, updateMovieDTO: UpdateMovieDto, publishDraft = false): Promise<Movies> {
    const currentMovie = await this.movieRepository.findOne({ where: { id } });

    const currentMoviePublish = await this.movieRepository.findOne({ where: { parentId: id, updateStatus: 'Draft' }});
    if (currentMoviePublish && updateMovieDTO.updateStatus !== 'Draft') {
      console.log('<<<<<MASUKKK DELETE ');
      
      await this.movieRepository.softDelete({ parentId: currentMovie.id });
    }
    if (!currentMovie) {
      throw new HttpException(`Movie not found`, HttpStatus.NOT_FOUND);
    }
  
    if (updateMovieDTO.updateStatus === 'Draft') {
      console.log('<<<<<<<111111>>>>>>');
      await this.saveAsDraft(currentMovie, updateMovieDTO);
    } else if (publishDraft && publishDraft.toString() === 'true') {

      console.log('<<<<<<<22222>>>>>>');
        await this.publishDraft(currentMovie, updateMovieDTO);
        await this.movieRepository.softDelete(id)
        const resUpdateFromDraft = await this.movieRepository.findOneBy({ id: currentMovie.parentId})
      return resUpdateFromDraft;
    } else {
      console.log('<<<<<<<333333>>>>>>');
      
      this.updateMovie(currentMovie, updateMovieDTO);
    }
    
    return currentMovie.save();
  }
  
  private async saveAsDraft(currentMovie: Movies, updateMovieDTO: UpdateMovieDto): Promise<void> {
    const hasMovieDraft = await this.movieRepository.findOne({ where: { parentId: currentMovie.id } });
  
    if (hasMovieDraft) {
      throw new HttpException(`This movie has already a draft`, HttpStatus.CONFLICT);
    }
  
    const movie = new Movies();
    this.updateMovie(movie, updateMovieDTO);
    movie.updateStatus = 'Draft';
    movie.parentId = currentMovie.id;
  
    await this.movieRepository.save(movie);
  }
  
  private async publishDraft(currentMovie: Movies, updateMovieDTO: UpdateMovieDto): Promise<void> {
    
    const draftMovie =await this.movieRepository.findOne({ where: {id: currentMovie.parentId}})
    const lala =await this.movieRepository.findOne({ where: {id: currentMovie.id}})
    console.log("🚀 ~ file: movies.service.ts:222 ~ MoviesService ~ publishDraft ~ lala:", lala)
    console.log("🚀 ~ file: movies.service.ts:221 ~ MoviesService ~ publishDraft ~ draftMovie:", draftMovie)
  
    if (!draftMovie) {
      throw new NotFoundException(`Draft not found`);
    }
  
    this.updateMovie(draftMovie, updateMovieDTO);
    draftMovie.updateStatus = 'Published';
  
    await this.movieRepository.save(draftMovie);
  }
  
  private updateMovie(movie: Movies, updateMovieDTO: UpdateMovieDto): void {
    movie.name = updateMovieDTO.name;
    movie.language = updateMovieDTO.language;
    movie.status = updateMovieDTO.status;
    movie.rating = updateMovieDTO.rating ? movie.rating : 0;
  
    // if (movie.rating > 5) {
    //   throw new HttpException(`Rate cannot be greater than 5`, HttpStatus.NOT_ACCEPTABLE);
    // }

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

 async lockCreateMovie(movieDto: CreateMoviesDto): Promise<Movies> {
  
  const find = await this.movieRepository.createQueryBuilder('movie')
  .setLock('pessimistic_write')
  .where('movie.name = :name', { name: movieDto.name})
  .getOne();
  if (!find) {
    throw new Error(`Movie not found.`);
  }

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
      // Using pessimistic lock when saving the movie record
      const lockedMovie = await this.movieRepository
      .createQueryBuilder('movies')
      .setLock('pessimistic_write')
      .insert()
      .into(Movies)
      .values(movie)
      .useTransaction(true)
      .execute();

      return lockedMovie.raw[0] as Movies;

}
}

