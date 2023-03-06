import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cast } from './cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  providers: [CastService],
  controllers: [CastController],
})
export class CastModule {}
