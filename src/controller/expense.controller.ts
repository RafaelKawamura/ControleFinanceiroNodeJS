import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExpenseService } from '../service/expense.service';
import { Expense } from '../entity/expense.entity';
import { ResultDto } from '../dto/result.dto';
import {
  ExpenseCreateDto,
  ExpenseTagsResultDto,
  ExpenseUpdateDto,
} from '../dto/expense.dto';

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
  @Get('/findallwithtags')
  public async findAllWithTags(): Promise<ExpenseTagsResultDto[] | null> {
    return await this.expenseService.findAllWithTags();
  }

  @Post('/create')
  async create(@Body() data: ExpenseCreateDto): Promise<ResultDto> {
    return this.expenseService.create(data);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() expenseUpdateDto: ExpenseUpdateDto,
  ): Promise<ResultDto> {
    return this.expenseService.update(id, expenseUpdateDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<ResultDto> {
    return this.expenseService.delete(id);
  }
}
