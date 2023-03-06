import { Cast } from '../cast/cast.entity';
import { Movies } from '../movies/movies.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  EntityMetadata,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieCast {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'movie_id', type: 'integer', nullable: true })
  movieId: number;

  @Column({ name: 'cast_id', type: 'integer', nullable: true })
  castId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Movies, (movie) => movie.movieCasts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Movies[];

  @ManyToOne(() => Cast, (cast) => cast.movieCasts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'cast_id' })
  cast: Cast[];
}
