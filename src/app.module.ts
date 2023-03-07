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

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    // ConfigModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: () => ({
    //     type: 'mysql',
    //     host: process.env.DB_HOST,
    //     port: parseInt(process.env.DB_PORT) || 3306,
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PW,
    //     database: process.env.DB_NAME,
    //     entities: [__dirname + '/../**/*.entity.{js,ts}'],
    //     logging: true,
    //     synchronize: false,
    //     autoLoadEntities: false,
    //   }),
    //   inject: [ConfigService],
    // }),
    MoviesModule,
    CastModule,
    MovieCastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  //exports: [TypeOrmModule],
})
export class AppModule {
  //constructor(private dataSource: DataSource) {}
}
