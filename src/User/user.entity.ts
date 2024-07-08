import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    length: 100,
    unique: true,
    nullable: false
  })
  email: string;
 
  @Column({
    length: 300,
    nullable: false
  })
  user_name: string;

  @Column({
    length: 300,
    nullable: false
  })
  password: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
