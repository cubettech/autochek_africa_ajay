import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoanStatus } from './loan-application.constant';

export class CreateLoanApplicationDto {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  vehicleId: number;
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  downPayment: number;
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  loanTerm: number;
}

export class UpdateLoanApplicationStatusDTO {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  applicationId: number;

  @ApiProperty({
    enum: LoanStatus,
    description: 'This is a required property',
  })
  status: LoanStatus;
}
