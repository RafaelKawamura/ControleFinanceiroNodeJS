import { Injectable } from '@nestjs/common';
import { Expense } from '../entity/expense.entity';
import { ExpenseRepository } from '../repository/expense.repository';
import { ExpenseTagRepository } from '../repository/expense_tag.repository';
import { BaseService } from 'src/service/base.service';
import {
  ExpenseCreateDto,
  ExpenseTagsResultDto,
  ExpenseTagsResultDto2,
  ExpenseUpdateDto,
} from '../dto/expense.dto';
import { ResultDto } from '../dto/result.dto';

@Injectable()
export class ExpenseService extends BaseService<Expense> {
  constructor(
    private expenseRepository: ExpenseRepository,
    private expenseTagRepository: ExpenseTagRepository,
  ) {
    super(expenseRepository);
  }

  async findAll(): Promise<Expense[]> {
    //let expenseWithTags = new ExpenseTagsResultDto2();
    //expenseWithTags.expense
    const findAll = await this.expenseRepository.find({
      relations: {
        spender: true,
        category: true,
        user: true,
        expense_tag: { tag: true },
      },
      select: {
        id: true,
        expense_desc: true,
        expense_date: true,
        expense_val: true,
        spender: {
          id: true,
          spender_name: true,
        },
        category: {
          id: true,
          category_name: true,
        },
        user: {
          id: true,
          user_name: true,
        },
        expense_tag: {
          id: true,
          tag: {
            id: true,
            tag_name: true,
          },
        },
      },
    });
    return findAll;
  }

  async findAllWithTags(): Promise<ExpenseTagsResultDto[]> {
    const findAllWithTags = await this.expenseRepository.cfExpenseTags();
    return findAllWithTags;
  }

  async findById(id: number): Promise<Expense> {
    const findExpense = await this.expenseRepository.findOneBy({ id });
    return findExpense;
  }

  async create(data: ExpenseCreateDto): Promise<ResultDto> {
    const expense = this.expenseRepository.create({
      expense_val: data.expense_val,
      expense_date: data.expense_date,
      expense_desc: data.expense_desc,
      spender: data.spender,
      category: data.category,
      user: data.user,
    });
    try {
      await this.expenseRepository.save(expense);
      for (let i = 0; i < data.tags.length; i++) {
        const expenseTag = this.expenseTagRepository.create({
          expense: expense,
          tag: data.tags[i],
        });
        await this.expenseTagRepository.save(expenseTag);
      }
      return <ResultDto>{
        status: 201,
        message: 'Expense registered on id: ' + expense.id,
      };
    } catch (error) {
      return <ResultDto>{
        status: 400,
        message: 'Creation failed: ' + error,
      };
    }
  }

  async update(id: number, data: ExpenseUpdateDto): Promise<ResultDto> {
    try {
      const expense = this.expenseRepository.create({
        id: id,
        expense_val: data.expense_val,
        expense_date: data.expense_date,
        expense_desc: data.expense_desc,
        spender: data.spender,
        category: data.category,
        user: data.user,
      });
      this.expenseRepository.update(id, expense);
      this.expenseTagRepository.cfClearTags(id);
      for (let i = 0; i < data.tags.length; i++) {
        const expenseTag = this.expenseTagRepository.create({
          expense: expense,
          tag: data.tags[i],
        });
        await this.expenseTagRepository.save(expenseTag);
      }
      return <ResultDto>{
        status: 201,
        message: 'Expense updated!',
      };
    } catch (error) {
      return <ResultDto>{
        status: 400,
        message: 'Update failed',
        data: error,
      };
    }
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
