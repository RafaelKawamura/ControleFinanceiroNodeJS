import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { ExpenseService } from './expense.service';
  import { Expense } from './expense.entity';
  import { resultDto } from '../Dto/result.dto';
  
  @Controller('/expense')
  export class ExpenseController {
    constructor(private expenseService: ExpenseService) {}
  
    @Get('/findall')
    public async findAll(): Promise<Expense[] | null> {
      return await this.expenseService.findAll();
    }
    @Get('/findbyid/:id')
    public async findOne(@Param('id') expense_id: number): Promise<Expense> {
      const findID = await this.expenseService.findById(expense_id);
      return findID;
    }
  }
  