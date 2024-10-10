import { Module } from '@nestjs/common';
import { LoanApplicationController } from './loan-application.controller';
import { LoanApplicationService } from './loan-application.service';
import { ValuationService } from 'src/valuation/valuation.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [LoanApplicationController],
  providers: [LoanApplicationService, ValuationService, VehicleService],
})
export class LoanApplicationModule {}
