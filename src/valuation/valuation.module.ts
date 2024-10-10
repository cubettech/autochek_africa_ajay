import { Module } from '@nestjs/common';
import { ValuationController } from './valuation.controller';
import { ValuationService } from './valuation.service';
import { HttpModule } from '@nestjs/axios';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Module({
  imports: [HttpModule],
  controllers: [ValuationController],
  providers: [ValuationService, VehicleService],
})
export class ValuationModule {}
