import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { Expense } from '../entity/expense.entity';
import { Repository } from 'typeorm/repository/Repository';

export class ExpenseRepository extends BaseRepository<Expense> {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {
    super(
      expenseRepository.target,
      expenseRepository.manager,
      expenseRepository.queryRunner,
    );
  }
}
