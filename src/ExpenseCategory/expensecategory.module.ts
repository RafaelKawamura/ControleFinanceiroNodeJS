import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { ExpenseCategoryController } from './expensecategory.controller';
import { expenseCategoryProviders } from './expensecategory.providers';
import { ExpenseCategoryService } from './expensecategory.service';
import { AdvancedConsoleLogger } from 'typeorm';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenseCategoryController],
  providers: [...expenseCategoryProviders, ExpenseCategoryService],
})
export class ExpenseCategoryModule {}
