import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { ExpenseCreateDto } from 'src/Dto/Expense.Dto';
import { resultDto } from 'src/Dto/result.dto';

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

  async create(data: ExpenseCreateDto): Promise<resultDto> {
    try{
      const expense = new Expense();
      expense.spender = data.spender;
      expense.category = data.category;
      expense.expense_date = data.expense_date;
      expense.expense_val = data.expense_val;
      expense.expense_desc = data.expense_desc;
      const newExpense = this.expenseRepository.save(expense);
      // if (data.categories.length>0){
      //   expenseCategoryService: ExpenseCategoryService
      //   const expenseCateogry = new ExpenseCategory
      //   expenseCateogry.expense_id = (await newExpense).expense_id
      //   for (const category of data.categories){
      //     expenseCateogry.category_id = category
      //     expenseCategoryService.create(expenseCateogry)
      //   }
      // }
      return this.expenseRepository
        .save(expense)
        .then(() => {
          return <resultDto>{
            status: 201,
            message: 'success!',
          };
        })
        .catch(() => {
          return <resultDto>{
            status: 400,
            message: 'spender already exists!',
          };
        });
    }
    catch (error: any){
      return <resultDto>{
        status: 400,
        message: 'spender already exists!',
      };
    }
  }

}
