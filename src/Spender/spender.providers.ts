import { DataSource } from 'typeorm';
import { Spender } from './spender.entity';

export const spenderProviders = [
  {
    provide: 'SPENDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Spender),
    inject: ['DATA_SOURCE'],
  },
];
