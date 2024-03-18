import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Student } from '@src/conditional/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from '@src/conditional/dtos/student/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepo.find();
  }

  async addStudent(studentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create(studentDto);
    return await this.studentRepo.save(student);
  }
}
