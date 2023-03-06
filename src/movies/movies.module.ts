import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCastService } from 'src/movie-cast/movie-cast.service';
import { MovieCastModule } from 'src/movie-cast/movie-cast.module';
import { dataSourceOptions } from 'src/config/typeorm-config';
import { Movies } from './movies.entity';
import { MovieCast } from 'src/movie-cast/movie-cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movies, MovieCast])],
  controllers: [MoviesController],
  providers: [MoviesService, MovieCastService],
  exports: [MoviesService],
})
export class MoviesModule {}
