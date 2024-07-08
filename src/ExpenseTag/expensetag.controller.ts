import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { ExpenseTagService } from './expensetag.service';
  import { ExpenseTag } from './expensetag.entity';
  import { resultDto } from '../Dto/result.dto';
  
  @Controller('/expensetag')
  export class ExpenseTagController {
    constructor(private expenseTagService: ExpenseTagService) {}
  
    @Get('/findall')
    public async findAll(): Promise<ExpenseTag[] | null> {
      return await this.expenseTagService.findAll();
    }
    @Get('/findbyid/:id')
    public async findOne(@Param('id') expense_id: number): Promise<ExpenseTag> {
      const findID = await this.expenseTagService.findById(expense_id);
      return findID;
    }

  }
  