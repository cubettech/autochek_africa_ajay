import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { DatabaseModule } from './database/database.module';
import { ValuationModule } from './valuation/valuation.module';
import { ConfigModule } from '@nestjs/config';
import { LoanApplicationModule } from './loan-application/loan-application.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VehicleModule,
    DatabaseModule,
    ValuationModule,
    LoanApplicationModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
