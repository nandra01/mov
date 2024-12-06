import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CastModule } from './cast/cast.module';
import { dataSourceOptions } from './config/typeorm-config';
import { MovieCastModule } from './movie-cast/movie-cast.module';
import { MoviesModule } from './movies/movies.module';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    CqrsModule,
    MoviesModule,
    CastModule,
    MovieCastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
