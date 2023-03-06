// import { Injectable } from '@nestjs/common';
// import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
// import { DataSource, EntityRepository, Repository } from 'typeorm';
// import { Movies } from './movies.entity';

// @EntityRepository(Movies)
// export class MoviesRepository extends Repository<Movies> {}

// export const moviesProviders = [
//   {
//     provide: 'MOVIE_REPOSITORY',
//     useFactory: (dataSource: DataSource) => dataSource.getRepository(Movies),
//     inject: ['DATA_SOURCE'],
//   },
// ];
