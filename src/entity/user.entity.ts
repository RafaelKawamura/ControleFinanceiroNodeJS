import { Base } from 'src/entity/base.entity';
import { Entity, OneToMany, Column } from 'typeorm';
import { Expense } from './expense.entity';

@Entity()
export class User extends Base {
  constructor(data) {
    super();
    Object.assign(this, data);
  }
  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    length: 300,
    nullable: false,
  })
  user_name: string;

  @Column({
    length: 300,
    nullable: false,
  })
  password: string;

  @OneToMany(() => Expense, (expense) => expense.category)
  expense: Expense[];
}
