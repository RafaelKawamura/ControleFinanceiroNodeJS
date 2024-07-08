import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseTag } from './expensetag.entity';
import { ExpenseTagCreateDto } from 'src/Dto/ExpenseTag.Dto';
import { resultDto } from 'src/Dto/result.dto';

@Injectable()
export class ExpenseTagService {
  constructor(
    @Inject('EXPENSETAG_REPOSITORY')
    private expenseTagRepository: Repository<ExpenseTag>,
  ) {}

  async findById(expense_id: number): Promise<ExpenseTag> {
    const findExpenseTag = await this.expenseTagRepository.findOneBy({
      expense_id,
    });
    return findExpenseTag;
  }

  async findAll(): Promise<ExpenseTag[]> {
    const findAll = await this.expenseTagRepository.find();
    return findAll;
  }
}