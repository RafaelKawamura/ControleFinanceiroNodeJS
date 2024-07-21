//import { Expense } from 'src/Expense/expense.entity';
import { Base } from 'src/entity/base.entity';
import { Entity, OneToMany, Column } from 'typeorm';
import { ExpenseTag } from './expense_tag.entity';

@Entity()
export class Tag extends Base {
  constructor(data) {
    super();
    Object.assign(this, data);
  }
  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  tag_name: string;

  @OneToMany(() => ExpenseTag, (expense_tag) => expense_tag.tag)
  expense_tag: ExpenseTag[];
}
