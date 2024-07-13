import { Expense } from 'src/Expense/expense.entity';
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
        onDelete: "CASCADE"
      })
    @JoinColumn({
        name: "expense_id"
    })
    expense: Expense;
  
    @PrimaryColumn({
      length: 50
    })
    tag: string;
    
    @CreateDateColumn()
    created_date: Date;
}