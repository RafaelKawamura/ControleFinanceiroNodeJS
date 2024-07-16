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
    TypeOrmModule.forFeature([Base, Category]),
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService, CategoryRepository],
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
