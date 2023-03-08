import { MovieCast } from '../movie-cast/movie-cast.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cast  extends BaseEntity  {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ name: 'birthday', length: 100, nullable: true })
  birthday: string;

  @Column({ name: 'deadday', type: 'timestamp', nullable: true })
  deadday: Date;

  @Column({ name: 'rating', type: 'integer', nullable: true })
  rating: number;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  address: string;

  @Column({ name: 'city', type: 'varchar', nullable: true })
  city: string;
  
  @Column({ name: 'region', length: 100, nullable: true })
  region: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => MovieCast, (movieCast) => movieCast.cast, {
    createForeignKeyConstraints: false,
  })
  movieCasts: MovieCast[];
}
