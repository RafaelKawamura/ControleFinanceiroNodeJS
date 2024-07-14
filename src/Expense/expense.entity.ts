import { Category } from 'src/Category/category.entity';
import { ExpenseTag } from 'src/ExpenseTag/expensetag.entity';
import { Spender } from 'src/Spender/spender.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  expense_id: number;

  @ManyToOne(() => Spender, (spender) => spender.expense, {
    onDelete: "CASCADE"
    ,nullable: false
  })
  @JoinColumn({
      name: "spender_id"
  })
  spender: Spender;

  @Column({
    nullable: false
  })
  expense_date: Date;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    nullable: false
  })
  expense_val: number;
  
  @ManyToOne(() => Category, (category) => category.expense, {
    onDelete: "CASCADE"
    ,nullable: false
  })
  @JoinColumn({
    name: "category_id"
  })
  category: Category;
  
  @OneToMany(() => ExpenseTag, (expense_tag) => expense_tag.expense)
  expense_tag: ExpenseTag[];

  @Column({
    length: 500,
    nullable: false
  })
  expense_desc: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

}
