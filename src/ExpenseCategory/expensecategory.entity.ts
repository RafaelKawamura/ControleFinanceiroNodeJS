import { Expense } from 'src/Expense/expense.entity';
import { Category } from 'src/Category/category.entity';
import {
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ExpenseCategory {

    @ManyToOne(() => Expense, (expense) => expense.expense_category, {
        onDelete: "CASCADE"
      })
    @JoinColumn({
        name: "expense_id"
    })
    expense: Expense;
  
    @ManyToOne(() => Category, (category) => category.expense_category, {
        onDelete: "CASCADE"
      })
    @JoinColumn({
        name: "category_id"
    })
    category: Category;

    @CreateDateColumn()
    created_date: Date;
}
