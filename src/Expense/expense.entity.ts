import { Category } from 'src/Category/category.entity';
import { ExpenseCategory } from 'src/ExpenseCategory/expensecategory.entity';
import { Spender } from 'src/Spender/spender.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  expense_id: number;

  @ManyToOne(() => Spender, (spender) => spender.expense, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
      name: "spender_id"
  })
  spender: Spender;

  @CreateDateColumn()
  expense_date: Date;

  @Column('numeric', {
    precision: 7,
    scale: 2
  })
  expense_val: number;
  
  @OneToMany(() => ExpenseCategory, (expense_category) => expense_category.expense)
  expense_category: ExpenseCategory[];

  @Column({ length: 500 })
  expense_desc: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

}
