import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { SpenderController } from './spender.controller';
import { spenderProviders } from './spender.providers';
import { SpenderService } from './spender.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SpenderController],
  providers: [...spenderProviders, SpenderService],
})
export class SpenderModule {}
