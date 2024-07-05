import { Expense } from 'src/Expense/expense.entity';
import { ExpenseCategory } from 'src/ExpenseCategory/expensecategory.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ length: 500, unique: true })
  category_name: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany(() => ExpenseCategory, (expense_category) => expense_category.category)
  expense_category: ExpenseCategory[];
}
