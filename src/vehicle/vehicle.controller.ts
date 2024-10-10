import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './vehicle.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Vehicle } from './vehicle.entity';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post('/create')
  @ApiCreatedResponse({
    description: 'Created Vehicle Successfully',
    type: Vehicle,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createVehicle(@Body() vehicleDetails: CreateVehicleDto) {
    try {
      // Call the service to create the vehicle
      return await this.vehicleService.createVehicle(vehicleDetails);
    } catch (error) {
      // Check if it's a known error, otherwise throw a generic error
      if (error instanceof HttpException) {
        // Re-throw known HTTP exceptions (like 409 conflict, 400 bad request, etc.)
        throw error;
      }

      // Log the error for debugging purposes
      console.error('Error in createVehicle:', error);

      // Throw an Internal Server Error for unhandled exceptions
      throw new HttpException(
        'Something went wrong while creating the vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
