import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './Expense/expense.module';
import { CategoryModule } from './Category/category.module';
import { SpenderModule } from './Spender/spender.module';

@Module({
  imports: [ExpenseModule, CategoryModule, SpenderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
