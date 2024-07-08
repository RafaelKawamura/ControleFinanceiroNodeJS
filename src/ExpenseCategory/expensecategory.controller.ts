import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { ExpenseCategoryService } from './expensecategory.service';
  import { ExpenseCategory } from './expensecategory.entity';
  import { resultDto } from '../Dto/result.dto';
  
  @Controller('/expensecategory')
  export class ExpenseCategoryController {
    constructor(private expenseCategoryService: ExpenseCategoryService) {}
  
    @Get('/findall')
    public async findAll(): Promise<ExpenseCategory[] | null> {
      return await this.expenseCategoryService.findAll();
    }
    @Get('/findbyid/:id')
    public async findOne(@Param('id') expense_id: number): Promise<ExpenseCategory> {
      const findID = await this.expenseCategoryService.findById(expense_id);
      return findID;
    }

  }
  