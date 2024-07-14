import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { ExpenseTagController } from './expensetag.controller';
import { expenseTagProviders } from './expensetag.providers';
import { ExpenseTagService } from './expensetag.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpenseTagController],
  providers: [...expenseTagProviders, ExpenseTagService],
})
export class ExpenseTagModule {}
