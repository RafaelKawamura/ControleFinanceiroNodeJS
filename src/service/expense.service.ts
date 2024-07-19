import { Injectable } from '@nestjs/common';
import { Expense } from '../entity/expense.entity';
import { ExpenseRepository } from '../repository/expense.repository';
import { ExpenseTagRepository } from '../repository/expense_tag.repository';
import { BaseService } from 'src/service/base.service';
import { ExpenseCreateDto, ExpenseUpdateDto } from '../dto/expense.dto';
import { ResultDto } from '../dto/result.dto';
import { TagService } from './tag.service';

@Injectable()
export class ExpenseService extends BaseService<Expense> {
  constructor(
    private expenseRepository: ExpenseRepository,
    private expenseTagRepository: ExpenseTagRepository,
    private tagService: TagService,
  ) {
    super(expenseRepository);
  }

  async findAll(): Promise<Expense[]> {
    const findAll = await this.expenseRepository.find();
    return findAll;
  }

  async findById(id: number): Promise<Expense> {
    const findExpense = await this.expenseRepository.findOneBy({ id });
    return findExpense;
  }

  async create(data: ExpenseCreateDto): Promise<ResultDto> {
    const expense = this.expenseRepository.create({
      expense_val: data.expense_val,
      expense_date: data.expense_date,
      spender: data.spender,
      category: data.category,
    });
    try {
      await this.expenseRepository.save(expense);
      for (let i = 0; i < data.tags.length; i++) {
        const tag = await this.tagService.findById(data.tags[i]);
        const expenseTag = this.expenseTagRepository.create({
          expense: expense,
          tag: tag,
        });
        await this.expenseTagRepository.save(expenseTag);
        return <ResultDto>{
          status: 201,
          message: 'Expense registered on id: ' + expense.id,
        };
      }
    } catch (error) {
      return <ResultDto>{
        status: 400,
        message: 'Creation failed: ' + error,
      };
    }
  }

  async update(
    id: number,
    expenseUpdateDto: ExpenseUpdateDto,
  ): Promise<ResultDto> {
    return this.expenseRepository
      .update(id, expenseUpdateDto)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Expense updated!',
        };
      })
      .catch((error: any) => {
        return <ResultDto>{
          status: 400,
          message: 'Update failed',
          data: error,
        };
      });
  }

  async delete(id: number): Promise<ResultDto> {
    return this.expenseRepository
      .delete(id)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'Expense deleted!',
        };
      })
      .catch((error: any) => {
        return <ResultDto>{
          status: 400,
          message: 'Deletion failed: ' + error,
        };
      });
  }
}
