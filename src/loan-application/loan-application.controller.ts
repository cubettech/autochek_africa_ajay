import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoanApplicationService } from './loan-application.service';
import { LoanApplication } from './loan-application.entity';
import {
  CreateLoanApplicationDto,
  UpdateLoanApplicationStatusDTO,
} from './loan-application.dto';

@ApiTags('Loan Application')
@Controller('loan-application')
export class LoanApplicationController {
  constructor(
    private readonly loanApplicationService: LoanApplicationService,
  ) {}

  @Post('/apply')
  @ApiCreatedResponse({
    description: 'Created Loan Application Successfully',
    type: LoanApplication,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected Error Occurred' })
  async createLoanApplication(
    @Body() loanApplicationDetails: CreateLoanApplicationDto,
  ) {
    try {
      return await this.loanApplicationService.applyForLoan(
        loanApplicationDetails,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-throw if it's already an HTTP exception (handled by NestJS)
      }
      // Handle unexpected errors
      throw new HttpException(
        'Unexpected error occurred while creating loan application',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('status')
  @ApiCreatedResponse({
    description: 'Loan Application Status Updated Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected Error Occurred' })
  async updateLoanStatus(
    @Body() updateLoanStatusDto: UpdateLoanApplicationStatusDTO,
  ) {
    try {
      const updatedLoanApplication =
        await this.loanApplicationService.updateLoanStatus(updateLoanStatusDto);

      return {
        message: `Loan application status updated successfully`,
        updatedLoanApplication,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-throw if it's already an HTTP exception (handled by NestJS)
      }
      // Handle unexpected errors
      throw new HttpException(
        'Unexpected error occurred while updating loan status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
