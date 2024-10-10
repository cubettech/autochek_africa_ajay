import {
  Body,
  Injectable,
  Logger,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanApplication } from './loan-application.entity';
import { DataSource, Repository } from 'typeorm';
import { ValuationService } from 'src/valuation/valuation.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { LoanStatus } from './loan-application.constant';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import {
  CreateLoanApplicationDto,
  UpdateLoanApplicationStatusDTO,
} from './loan-application.dto';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';

@Injectable()
export class LoanApplicationService {
  private ltvRatio: number = parseInt(process.env.LTV_RATIO) || 80;
  private loanRepository: Repository<LoanApplication>;
  private logger = new Logger();

  constructor(
    private readonly valuationService: ValuationService,
    private readonly vehicleService: VehicleService,
    private dataSource: DataSource,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
    this.loanRepository = this.dataSource.getRepository(LoanApplication);
  }

  async calculateLoanAmount(
    vehicleDetails: Vehicle,
    applicationDetails: CreateLoanApplicationDto,
  ): Promise<number> {
    // Step 1: Get the latest valuation for the vehicle
    const latestValuation =
      await this.valuationService.getAndStoreValuationByVin(vehicleDetails.vin);

    if (!latestValuation) {
      throw new Error('No valuation available for this vehicle.');
    }

    // Step 2: Apply Loan-to-Value (LTV) Ratio
    const maxLoanAmount = latestValuation.loanValue * (this.ltvRatio / 100);

    const finalLoanAmount = maxLoanAmount - applicationDetails.downPayment;

    // Step 4: Ensure the loan amount is not negative or exceeds certain limits
    return Math.max(0, finalLoanAmount);
  }

  async applyForLoan(
    details: CreateLoanApplicationDto,
  ): Promise<LoanApplication> {
    try {
      const vehicle = await this.vehicleService.getVehicleById(
        details.vehicleId,
      );
      const loanAmount = await this.calculateLoanAmount(vehicle, details);

      // Step 5: Create a new loan application with the calculated amount
      const newLoanApplication = this.loanRepository.create({
        loanAmount,
        status: LoanStatus.Pending,
        applicationDate: new Date(),
        vehicle,
      });

      return this.loanRepository.save(newLoanApplication);
    } catch (error) {
      this.errorHandlerService.handleServiceErrors(
        error,
        'applyForLoan',
        this.logger,
      );
    }
  }

  async updateLoanStatus(
    @Body() updateLoanStatusDto: UpdateLoanApplicationStatusDTO,
  ) {
    try {
      const { applicationId, status } = updateLoanStatusDto;
      const loanApplication = await this.loanRepository.findOne({
        where: {
          id: applicationId,
        },
      });

      if (!loanApplication) {
        throw new NotFoundException('Loan application not found');
      }

      loanApplication.status = status;
      await this.loanRepository.save(loanApplication);

      return loanApplication;
    } catch (error) {
      this.errorHandlerService.handleServiceErrors(
        error,
        'updateLoanStatus',
        this.logger,
      );
    }
  }
}
