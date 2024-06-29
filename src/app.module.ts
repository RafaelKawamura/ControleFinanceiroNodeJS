import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './Expense/expense.module';
import { CategoryModule } from './Category/category.module';

@Module({
  imports: [ExpenseModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
