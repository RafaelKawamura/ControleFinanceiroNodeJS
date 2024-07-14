import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { TagController } from './tag.controller';
import { tagProviders } from './tag.providers';
import { TagService } from './tag.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TagController],
  providers: [...tagProviders, TagService],
})
export class TagModule {}
