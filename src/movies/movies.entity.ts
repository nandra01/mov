
import { MovieCast } from '../movie-cast/movie-cast.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusMovie } from './movie.enum';

@Entity()
export class Movies extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ name: 'language', type: 'varchar', length: 30, nullable: true })
  language: string;

  @Column({ name: 'status', type: 'varchar', length: 10, nullable: true })
  status: string;

  @Column({ name: 'rating', type: 'integer', nullable: true })
  rating: number;

  @Column({ name: 'address', type: 'varchar', length: 50, nullable: true })
  address: string;

  @Column({ name: 'city', type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'enum', name: 'status_movie', enum: StatusMovie, default: null })
  statusMovie: StatusMovie;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => MovieCast, (movieCast) => movieCast.movie, {
    createForeignKeyConstraints: false,
  })
  movieCasts: MovieCast[];
}
