import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ValuationService } from './valuation.service';
import {
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { Valuation } from './valuation.entity';

@ApiTags('Valuation')
@Controller('valuation')
export class ValuationController {
  constructor(private readonly valuationService: ValuationService) {}

  @Get(':vin')
  @ApiOperation({
    summary: 'Get Vehicle"s latest valuation details',
    description: 'Get the latest valuation details for a vehicle ',
  })
  @ApiFoundResponse({
    description: 'Fetched Valuation Successfully',
    type: Valuation,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Vehicle or Valuation Not Found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected Error Occurred',
  })
  async getValuation(@Param('vin') vin: string): Promise<Valuation> {
    try {
      return await this.valuationService.getAndStoreValuationByVin(vin);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Let NestJS handle the known HTTP exceptions (like NotFound)
      }

      // Handle any unknown/unexpected errors here
      throw new HttpException(
        'Unexpected error occurred while fetching valuation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
