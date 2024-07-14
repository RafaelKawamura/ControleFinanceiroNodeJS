import { DataSource } from 'typeorm';
import { ExpenseTag } from './expensetag.entity';

export const expenseTagProviders = [
  {
    provide: 'EXPENSECATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExpenseTag),
    inject: ['DATA_SOURCE'],
  },
];
