import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCast } from './movie-cast.entity';
import { MovieCastService } from './movie-cast.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieCast])],
  exports: [MovieCastService],
  providers: [MovieCastService],
})
export class MovieCastModule {}
