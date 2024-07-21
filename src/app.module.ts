import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { EntityManager } from 'typeorm';
import { Category } from './entity/category.entity';
import { Base } from './entity/base.entity';
import { CategoryRepository } from './repository/category.repository';
import * as dotenv from 'dotenv';
import { Tag } from './entity/tag.entity';
import { TagController } from './controller/tag.controller';
import { TagRepository } from './repository/tag.repository';
import { Expense } from './entity/expense.entity';
import { Spender } from './entity/spender.entity';
import { User } from './entity/user.entity';
import { ExpenseTag } from './entity/expense_tag.entity';
import { TagService } from './service/tag.service';
import { SpenderService } from './service/spender.service';
import { SpenderRepository } from './repository/spender.repository';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { UserController } from './controller/user.controller';
import { SpenderController } from './controller/spender.controller';
import { ExpenseController } from './controller/expense.controller';
import { ExpenseService } from './service/expense.service';
import { ExpenseRepository } from './repository/expense.repository';
import { ExpenseTagService } from './service/expense_tag.service';
import { ExpenseTagRepository } from './repository/expense_tag.repository';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Base,
      Category,
      Tag,
      Expense,
      Spender,
      User,
      ExpenseTag,
    ]),
  ],
  controllers: [
    AppController,
    CategoryController,
    TagController,
    SpenderController,
    UserController,
    ExpenseController,
  ],
  providers: [
    AppService,
    // Category
    CategoryService,
    CategoryRepository,
    // Tag
    TagService,
    TagRepository,
    // Spender
    SpenderService,
    SpenderRepository,
    // User
    UserService,
    UserRepository,
    // Expense
    ExpenseService,
    ExpenseRepository,
    // ExpenseTag
    ExpenseTagService,
    ExpenseTagRepository,
  ],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly em: EntityManager) {}
  onModuleInit() {
    console.log(process.env.DB_HOST);
  }

  async onModuleDestroy(): Promise<void> {
    const connection = this.em.connection;
    const isConnected = connection.isInitialized;

    if (isConnected) {
      await connection.destroy();
    }
  }

  // onModuleInit(): void {
  //   this.logger.log('AppModule has been initialized');
  // }
}
