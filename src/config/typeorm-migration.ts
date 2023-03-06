import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './typeorm-config';

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
