import { ExpenseCategory } from 'src/ExpenseCategory/expensecategory.entity';
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
    nullable: false
  })
  category_name: string; 

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany(() => ExpenseCategory, (expense_category) => expense_category.category)
  expense_category: ExpenseCategory[];
}
