import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExpenseTag } from './expensetag.entity';
import {
  ExpenseTagCreateDto,
  ExpenseTagInsertDto,
} from 'src/Dto/ExpenseTag.Dto';
import { resultDto } from 'src/Dto/result.dto';

@Injectable()
export class ExpenseTagService {
  constructor(
    @Inject('EXPENSECATEGORY_REPOSITORY')
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

  async create(data: ExpenseTagCreateDto): Promise<resultDto> {
    const expenseTag = new ExpenseTag();
    expenseTag.tag_id = data.tag_id;
    expenseTag.expense_id = data.expense_id;
    return await this.expenseTagRepository
      .save(expenseTag)
      .then(() => {
        return <resultDto>{
          status: 201,
          message: 'Success!',
        };
      })
      .catch((error) => {
        return <resultDto>{
          status: 400,
          message: 'Failed: ' + error,
        };
      });
  }

  async insert(data: Array<ExpenseTagInsertDto>): Promise<resultDto> {
    const expenseTags = new Array<ExpenseTag>();
    let i = 0;
    console.log(data);
    for (const eTag of data) {
      console.log('test', eTag);
      expenseTags[i].expense_id = eTag.expense_id;
      expenseTags[i].tag_id = eTag.tag_id;
      i += 1;
    }
    return await this.expenseTagRepository
      .insert(expenseTags)
      .then(() => {
        return <resultDto>{
          status: 201,
          message: 'Success!',
        };
      })
      .catch((error) => {
        return <resultDto>{
          status: 400,
          message: 'Failed: ' + error,
        };
      });
  }
}
