import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { ExpenseTag } from '../entity/expense_tag.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ResultDto } from 'src/dto/result.dto';

export class ExpenseTagRepository extends BaseRepository<ExpenseTag> {
  constructor(
    @InjectRepository(ExpenseTag)
    private expenseTagRepository: Repository<ExpenseTag>,
  ) {
    super(
      expenseTagRepository.target,
      expenseTagRepository.manager,
      expenseTagRepository.queryRunner,
    );
  }

  async cfSoftDelete(expense_id: number, tag_id: number): Promise<ResultDto> {
    await this.expenseTagRepository
      .createQueryBuilder()
      .delete()
      .from('ExpenseTag')
      .where('expense_id = :expense_id', { expense_id: expense_id })
      .andWhere('tag_id = :tag_id', { tag_id: tag_id })
      .andWhere('deleted_at is null')
      .execute()
      .then(() => {
        return <ResultDto>{
          status: 201,
          message: 'ExpenseTag deleted!',
        };
      })
      .catch((error: any) => {
        return <ResultDto>{
          status: 400,
          message: 'Deletion failed: ' + error,
        };
      });
    return <ResultDto>{ status: 503, message: 'Something went wrong' };
  }
}
