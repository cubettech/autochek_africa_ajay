import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { VehicleValuationResponse } from './valuation.dto';
import { Valuation } from './valuation.entity';
import { DataSource, Repository } from 'typeorm';
import { VehicleService } from '../vehicle/vehicle.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Injectable()
export class ValuationService {
  private valuationRepository: Repository<Valuation>;
  private logger = new Logger(ValuationService.name);

  constructor(
    private readonly httpService: HttpService,
    private dataSource: DataSource,
    private readonly vehicleService: VehicleService,
    private readonly errorHandlerService: ErrorHandlerService, // Reusable error handler
  ) {
    this.valuationRepository = this.dataSource.getRepository(Valuation);
  }

  private async fetchValuation(vin: string): Promise<VehicleValuationResponse> {
    const url = `${process.env.RAPIDAPI_VLOOKUP_URL}?vin=${vin}`;
    const headers = {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    };

    try {
      const { data } = await lastValueFrom(
        this.httpService.get<VehicleValuationResponse>(url, { headers }),
      );
      return data;
    } catch (error) {
      // Log and throw custom error for third-party API failure
      this.logger.error('Error fetching valuation:', error);
      throw new InternalServerErrorException('Failed to get vehicle valuation');
    }
  }

  async getAndStoreValuationByVin(vin: string): Promise<Valuation> {
    try {
      // Fetch the vehicle by VIN
      const vehicle = await this.vehicleService.getVehicleByVin(vin);
      if (!vehicle) {
        throw new NotFoundException(`Vehicle with VIN ${vin} not found`);
      }

      // Fetch the valuation from the third-party API
      const valuationResponse = await this.fetchValuation(vin);
      if (!valuationResponse) {
        throw new InternalServerErrorException('Failed to fetch valuation');
      }

      // Create a new Valuation entity with the response data
      const newValuation = this.valuationRepository.create({
        uid: valuationResponse.uid,
        loanValue: valuationResponse.loan_value,
        tradeInValue: valuationResponse.trade_in_value,
        adjustedTradeInValue: valuationResponse.adjusted_trade_in_value,
        make: valuationResponse.make,
        model: valuationResponse.model,
        year: valuationResponse.year,
        retailValue: valuationResponse.retail_value,
        msrpValue: valuationResponse.msrp_value,
        averageTradeIn: valuationResponse.average_trade_in,
        mileageAdjustment: valuationResponse.mileage_adjustment,
        valuationDate: new Date(),
        vehicle: vehicle,
      });

      // Save the new valuation in the database
      return await this.valuationRepository.save(newValuation);
    } catch (error) {
      this.errorHandlerService.handleServiceErrors(
        error,
        'getAndStoreValuationByVin',
        this.logger,
      );
    }
  }
}
