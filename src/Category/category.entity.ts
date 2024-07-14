import { Expense } from 'src/Expense/expense.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  category_name: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany(() => Expense, (expense) => expense.category)
  expense: Expense[];
}
