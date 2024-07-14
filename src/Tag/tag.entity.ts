import { ExpenseTag } from 'src/ExpenseTag/expensetag.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @Column({
    length: 100,
    unique: true,
    nullable: false
  })
  tag_name: string; 

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany(() => ExpenseTag, (expense_tag) => expense_tag.tag)
  expense_tag: ExpenseTag[];
}
