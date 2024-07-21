import { Expense } from 'src/entity/expense.entity';
import { Tag } from 'src/entity/tag.entity';

export class ExpenseTagCreateDto {
  expense: Expense;
  tag: Tag;
}
