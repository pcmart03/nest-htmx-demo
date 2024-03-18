import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { StudentsTemplateData } from '../../types/student.types';
import { appConfig } from '@src/app.config';
import { StudentsService } from '@src/conditional/data-access/students/students.service';
import { ConditionalRequestBody } from '@src/conditional/types/conditional.type';
import { CreateStudentDto } from '@src/conditional/dtos/student/create-student.dto';

@Controller('conditional')
export class ConditionalController {
  constructor(private studentService: StudentsService) {}
  @Get()
  @Render('conditional-index')
  index() {
    return { title: appConfig.title };
  }

  /**
   * The students template is lazy loaded into the index view using htmx's onload trigger.
   * Although the template lives in the view folder, it can be considered a partial.
   *
   * */
  @Get('/student')
  @Render('students')
  async students(): Promise<StudentsTemplateData> {
    const students = await this.studentService.getAllStudents();
    return {
      students,
    };
  }

  @Post('/student')
  @Render('students')
  async createStudent(
    @Body() student: CreateStudentDto,
  ): Promise<StudentsTemplateData> {
    await this.studentService.addStudent(student);
    const students = await this.studentService.getAllStudents();
    return {
      students,
    };
  }

  /**
   * Here we select the template to render based on the type property in the post body.
   *
   * */
  @Post('/user-info')
  conditionalRendering(
    @Body() { name, type }: ConditionalRequestBody,
    @Res() res: Response,
  ) {
    res.render(type, { name });
  }
}
