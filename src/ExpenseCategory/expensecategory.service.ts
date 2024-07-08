import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseCategory } from './expensecategory.entity';
import { ExpenseCategoryCreateDto } from 'src/Dto/ExpenseCategory.Dto';
import { resultDto } from 'src/Dto/result.dto';

@Injectable()
export class ExpenseCategoryService {
  constructor(
    @Inject('EXPENSECATEGORY_REPOSITORY')
    private expenseCategoryRepository: Repository<ExpenseCategory>,
  ) {}

  async findById(expense_id: number): Promise<ExpenseCategory> {
    const findExpenseCategory = await this.expenseCategoryRepository.findOneBy({
      expense_id,
    });
    return findExpenseCategory;
  }

  async findAll(): Promise<ExpenseCategory[]> {
    const findAll = await this.expenseCategoryRepository.find();
    return findAll;
  }
}