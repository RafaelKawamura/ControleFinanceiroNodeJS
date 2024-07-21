import { Category } from 'src/entity/category.entity';
import { Spender } from 'src/entity/spender.entity';
import { Tag } from 'src/entity/tag.entity';
import { User } from 'src/entity/user.entity';

export class ExpenseCreateDto {
  spender: Spender;
  category: Category;
  expense_date: Date;
  expense_val: number;
  expense_desc: string;
  user: User;
  tags: Array<Tag>;
}

export class ExpenseUpdateDto extends ExpenseCreateDto {}
