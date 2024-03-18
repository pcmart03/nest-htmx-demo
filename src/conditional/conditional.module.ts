import { Module } from '@nestjs/common';
import { ConditionalController } from './controllers/conditional/conditional.controller';
import { StudentsService } from './data-access/students/students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@src/conditional/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [ConditionalController],
  providers: [StudentsService],
})
export class ConditionalModule {}
