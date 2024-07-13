import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './Expense/expense.module';
import { CategoryModule } from './Category/category.module';
import { SpenderModule } from './Spender/spender.module';
import { ExpenseCategoryModule } from './ExpenseCategory/expensecategory.module';
import { ExpenseTagModule } from './ExpenseTag/expensetag.module';

@Module({
  imports: [ExpenseModule, CategoryModule, SpenderModule, ExpenseCategoryModule, ExpenseTagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
