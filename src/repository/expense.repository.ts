import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/repository/base.repository';
import { Expense } from '../entity/expense.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ExpenseTagsResultDto } from 'src/dto/expense.dto';

export class ExpenseRepository extends BaseRepository<Expense> {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {
    super(
      expenseRepository.target,
      expenseRepository.manager,
      expenseRepository.queryRunner,
    );
  }

  async cfExpenseTags(): Promise<ExpenseTagsResultDto[]> {
    return this.expenseRepository
      .createQueryBuilder('expense')
      .select([
        'expense.id' as 'id',
        'expense.expense_desc' as 'expense_desc',
        'expense.expense_val' as 'expense_val',
        'expense.expense_date' as 'expense_date',
        'spender.spender_name' as 'spender_name',
        'category.category_name' as 'category_name',
        'user.user_name' as 'user_name',
        'GROUP_CONCAT(tag.tag_name)' as 'tags',
      ])
      .leftJoin('spender', 'spender', 'spender.id = expense.spender_id')
      .leftJoin('category', 'category', 'category.id = expense.category_id')
      .leftJoin('user', 'user', 'user.id = expense.user_id')
      .leftJoin(
        'expense_tag',
        'expense_tag',
        'expense_tag.expense_id = expense.id',
      )
      .leftJoin('tag', 'tag', 'tag.id = expense_tag.tag_id')
      .groupBy(
        [
          'expense.id',
          'expense.expense_desc',
          'expense.expense_val',
          'expense.expense_date',
          'spender.spender_name',
          'category.category_name',
          'user.user_name',
        ].join(','),
      )
      .getRawMany();
  }
}
