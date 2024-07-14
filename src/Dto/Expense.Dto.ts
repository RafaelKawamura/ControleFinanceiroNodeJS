import { Category } from 'src/Category/category.entity';
import { Spender } from 'src/Spender/spender.entity';

export class ExpenseCreateDto {
  spender: Spender;
  expense_date: Date;
  expense_val: number;
  expense_desc: string;
  category: Category;
  tags: Array<number>;
}
