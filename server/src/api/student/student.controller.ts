import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';

@Controller('student')
@ApiTags('student')
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
}
