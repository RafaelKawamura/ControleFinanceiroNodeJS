//import { Expense } from 'src/Expense/expense.entity';
import { Base } from 'src/entity/base.entity';
import { Entity, OneToMany, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Spender } from './spender.entity';
import { Category } from './category.entity';
import { User } from './user.entity';
import { ExpenseTag } from './expense_tag.entity';

@Entity()
export class Expense extends Base {
  constructor(data) {
    super();
    Object.assign(this, data);
  }
  @ManyToOne(() => Spender, (spender) => spender.expense, {
    //onDelete: 'CASCADE', if enable will delete all expenses of that spender
    nullable: false,
  })
  @JoinColumn({
    name: 'spender_id',
  })
  spender: Spender;

  @ManyToOne(() => Category, (category) => category.expense, {
    //onDelete: 'CASCADE', if enable will delete all expenses of that category
    nullable: true,
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @Column({
    nullable: false,
  })
  expense_date: Date;

  @Column('numeric', {
    precision: 7,
    scale: 2,
    nullable: false,
  })
  expense_val: number;

  @Column({
    length: 500,
    nullable: true,
  })
  expense_desc: string;

  @ManyToOne(() => User, (user) => user.expense, {
    //onDelete: 'CASCADE', if enables it will delete all expenses of that user
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(() => ExpenseTag, (expense_tag) => expense_tag.expense)
  expense_tag: ExpenseTag[];
}
