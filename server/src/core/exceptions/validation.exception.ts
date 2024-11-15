import { BadRequestException, ValidationError } from '@nestjs/common';

class ValidationExceptions extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super({
      error: 'ValidationError',
      message: errors
        ?.map((e) => (e.constraints ? Object.values(e.constraints) : []))
        .flat()[0],
    });
  }
}

export default ValidationExceptions;
