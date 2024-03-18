import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConditionalModule } from './conditional/conditional.module';
import { Student } from '@src/conditional/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestedModule } from './nested/nested.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: [Student],
    }),
    ConditionalModule,
    NestedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
