import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { ExpenseController } from './expense.controller';
import { expenseProviders } from './expense.providers';
import { ExpenseService } from './expense.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenseController],
  providers: [...expenseProviders, ExpenseService],
})
export class ExpenseModule {}
