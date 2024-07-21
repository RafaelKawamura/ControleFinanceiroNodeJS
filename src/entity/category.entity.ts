import { Base } from 'src/entity/base.entity';
import { Entity, OneToMany, Column } from 'typeorm';
import { Expense } from './expense.entity';

@Entity()
export class Category extends Base {
  constructor(data) {
    super();
    Object.assign(this, data);
  }
  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  category_name: string;

  @OneToMany(() => Expense, (expense) => expense.category)
  expense: Expense[];
}
