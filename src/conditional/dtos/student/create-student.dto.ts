import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
export class CreateStudentDto {
  @IsNotEmpty({ message: 'A student name is required.' })
  @IsString()
  @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
  name: string;

  @IsNotEmpty({ message: 'A student email is required.' })
  @IsEmail()
  email: string;
}
