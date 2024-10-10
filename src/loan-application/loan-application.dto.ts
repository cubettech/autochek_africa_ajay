import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { LoanStatus } from './loan-application.constant';

export class CreateLoanApplicationDto {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNotEmpty({ message: 'Vehicle ID is required' })
  @IsNumber({}, { message: 'Vehicle ID must be a number' })
  vehicleId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNotEmpty({ message: 'Down Payment is required' })
  @IsNumber({}, { message: 'Down Payment must be a number' })
  downPayment: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNotEmpty({ message: 'Loan Term is required' })
  @IsNumber({}, { message: 'Loan Term must be a number' })
  loanTerm: number;
}

export class UpdateLoanApplicationStatusDTO {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  @IsNotEmpty({ message: 'Application ID is required' })
  @IsNumber({}, { message: 'Application ID must be a number' })
  applicationId: number;

  @ApiProperty({
    enum: LoanStatus,
    description: 'This is a required property',
  })
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(LoanStatus, {
    message: `Status must be one of the following: ${Object.values(LoanStatus).join(', ')}`,
  })
  status: LoanStatus;
}
