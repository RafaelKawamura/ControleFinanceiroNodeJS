//import { Expense } from 'src/Expense/expense.entity';
import { Base } from 'src/entity/base.entity';
import { Entity, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Expense } from './expense.entity';
import { Tag } from './tag.entity';

@Entity()
@Unique(['expense', 'tag'])
export class ExpenseTag extends Base {
  constructor(data) {
    super();
    Object.assign(this, data);
  }
  @ManyToOne(() => Expense, (expense) => expense.expense_tag, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'expense_id',
  })
  expense: Expense;

  @ManyToOne(() => Tag, (tag) => tag.expense_tag, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'tag_id',
  })
  tag: Tag;
}
