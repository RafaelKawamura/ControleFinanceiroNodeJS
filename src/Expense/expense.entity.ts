import { Category } from 'src/Category/category.entity';
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
  
  @ManyToMany(() => Category, (category) => category.expenses)
  @JoinTable({
      name: "expense_categories",
      joinColumn: {
          name: "expense_id",
          referencedColumnName: "expense_id"
      },
      inverseJoinColumn: {
          name: "category_id",
          referencedColumnName: "category_id"
      }
  })
  categories: Category[];

  @Column({ length: 500 })
  expense_desc: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

}
