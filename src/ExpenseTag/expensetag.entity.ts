import { Expense } from 'src/Expense/expense.entity';
import { Tag } from 'src/Tag/tag.entity';
import {
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class ExpenseTag {
  @PrimaryColumn()
  expense_id: number;

  @ManyToOne(() => Expense, (expense) => expense.expense_tag, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'expense_id',
  })
  expense: Expense;

  @PrimaryColumn()
  tag_id: number;

  @ManyToOne(() => Tag, (tag) => tag.expense_tag, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'tag_id',
  })
  tag: Tag;

  @CreateDateColumn()
  created_date: Date;
}
