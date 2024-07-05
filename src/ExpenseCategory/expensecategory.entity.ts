import { Expense } from 'src/Expense/expense.entity';
import { Category } from 'src/Category/category.entity';
import {
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class ExpenseCategory {
    
    @PrimaryColumn()
    expense_id: number;

    @ManyToOne(() => Expense, (expense) => expense.expense_category, {
        onDelete: "CASCADE"
      })
    @JoinColumn({
        name: "expense_id"
    })
    expense: Expense;
  
    @PrimaryColumn()
    category_id: number;
    
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
