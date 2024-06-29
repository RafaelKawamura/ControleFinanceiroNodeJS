import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @Inject('EXPENSE_REPOSITORY')
    private expenseRepository: Repository<Expense>,
  ) {}

  async findById(expense_id: number): Promise<Expense> {
    const findExpense = await this.expenseRepository.findOneBy({
      expense_id,
    });
    return findExpense;
  }

  async findAll(): Promise<Expense[]> {
    const findAll = await this.expenseRepository.find();
    return findAll;
  }
}
