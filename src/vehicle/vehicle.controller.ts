import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './vehicle.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Vehicle } from './vehicle.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create Vehicle Details',
    description: 'Add a new vehicle details into the application',
  })
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

      // Throw an Internal Server Error for unhandled exceptions
      throw new HttpException(
        'Something went wrong while creating the vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/findAll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get All the Vehicles',
    description:
      'Get all the vehicles that are present in the application at this time',
  })
  @ApiFoundResponse({
    description: 'Results Found!',
    type: Vehicle,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAllVehicles() {
    try {
      return await this.vehicleService.getAllVehicles();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      // Throw an Internal Server Error for unhandled exceptions
      throw new HttpException(
        'Something went wrong while creating the vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
