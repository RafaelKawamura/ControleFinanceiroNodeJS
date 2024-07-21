import { Injectable } from '@nestjs/common';
import { ExpenseTag } from '../entity/expense_tag.entity';
import { ExpenseTagRepository } from '../repository/expense_tag.repository';
import { BaseService } from 'src/service/base.service';
import { ExpenseTagCreateDto } from '../dto/expense_tag.dto';
import { ResultDto } from '../dto/result.dto';

@Injectable()
export class ExpenseTagService extends BaseService<ExpenseTag> {
  constructor(private expenseTagRepository: ExpenseTagRepository) {
    super(expenseTagRepository);
  }

  async findAll(): Promise<ExpenseTag[]> {
    const findAll = await this.expenseTagRepository.find();
    return findAll;
  }

  async findById(id: number): Promise<ExpenseTag> {
    const findExpenseTag = await this.expenseTagRepository.findOneBy({ id });
    return findExpenseTag;
  }

  async create(data: ExpenseTagCreateDto): Promise<ResultDto> {
    const expenseTag = this.expenseTagRepository.create({
      expense: data.expense,
      tag: data.tag,
    });
    return await this.expenseTagRepository
      .save(expenseTag)
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'ExpenseTag registered on id: ' + expenseTag.id,
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: 400,
          message: 'Creation failed: ' + error,
        };
      });
  }
}
