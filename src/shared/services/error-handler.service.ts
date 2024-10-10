// src/common/services/error-handler.service.ts
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleServiceErrors(error: any, methodName: string, logger: Logger): never {
    logger.error(`Error in ${methodName}: ${error.message}`, error.stack);

    if (
      error instanceof ConflictException ||
      error instanceof NotFoundException
    ) {
      throw error;
    } else {
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
