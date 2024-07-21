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

  async cfClearTags(expense_id: number): Promise<ResultDto> {
    return await this.expenseTagRepository
      .createQueryBuilder()
      .delete()
      .from(ExpenseTag)
      .where('expense_id = :expense_id', { expense_id })
      .execute()
      .then(() => {
        return <ResultDto>{
          status: 200,
          message: 'Tags deleted on id: ' + expense_id,
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: 400,
          message: 'Deletion failed: ' + error,
        };
      });
  }
}
