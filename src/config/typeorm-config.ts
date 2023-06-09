import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
const nodeEnv = process.env.NODE_ENV || '';

const config = dotenv.parse(fs.readFileSync(`${nodeEnv}.env`));

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PW,
  database: config.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
  migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
};
