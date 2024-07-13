import { DataSource } from 'typeorm';
import { ExpenseCategory } from './expensecategory.entity';

export const expenseCategoryProviders = [
  {
    provide: 'EXPENSECATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExpenseCategory),
    inject: ['DATA_SOURCE'],
  },
];
