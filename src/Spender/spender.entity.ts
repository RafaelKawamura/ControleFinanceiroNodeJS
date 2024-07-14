import { Expense } from 'src/Expense/expense.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Spender {
  @PrimaryGeneratedColumn()
  spender_id: number;

  @Column({
    length: 300,
    nullable: false,
  })
  spender_name: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany(() => Expense, (expense) => expense.spender)
  expense: Expense[];
}
