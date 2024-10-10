import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoanApplicationService } from './loan-application.service';
import { LoanApplication } from './loan-application.entity';
import {
  CreateLoanApplicationDto,
  UpdateLoanApplicationStatusDTO,
} from './loan-application.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Loan Application')
@Controller('loan-application')
export class LoanApplicationController {
  constructor(
    private readonly loanApplicationService: LoanApplicationService,
  ) {}

  @Post('/apply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Apply a loan application',
    description: 'Apply a single loan application for a vehicle ',
  })
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Change status for a loan application',
    description: 'Change the status of an application',
  })
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
