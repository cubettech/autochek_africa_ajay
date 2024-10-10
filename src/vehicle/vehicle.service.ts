import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './vehicle.dto';
import { ErrorHandlerService } from 'src/shared/services/error-handler.service';

@Injectable()
export class VehicleService {
  private vehicleRepository: Repository<Vehicle>;
  private logger = new Logger();
  constructor(
    private dataSource: DataSource,
    private errorHandlerService: ErrorHandlerService,
  ) {
    this.vehicleRepository = this.dataSource.getRepository(Vehicle);
  }
  //  create handler to create new user and save to the database
  async createVehicle(createVehicle: CreateVehicleDto): Promise<Vehicle> {
    try {
      const existingVehicle = await this.vehicleRepository.findOne({
        where: { vin: createVehicle.vin },
      });
      if (existingVehicle) {
        this.logger.warn(
          `Vehicle with VIN ${createVehicle.vin} already exists`,
        );
        throw new ConflictException('Vehicle already exists');
      }

      const newVehicle = this.vehicleRepository.create(createVehicle);
      return await this.vehicleRepository.save(newVehicle);
    } catch (error) {
      this.errorHandlerService.handleServiceErrors(
        error,
        'createVehicle',
        this.logger,
      );
    }
  }

  async getVehicleByVin(vin: string): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { vin } });
      if (!vehicle) {
        this.logger.warn(`Vehicle with VIN ${vin} not found`);
        throw new NotFoundException('Vehicle not found');
      }
      return vehicle;
    } catch (error) {
      this.errorHandlerService.handleServiceErrors(
        error,
        'getVehicleByVin',
        this.logger,
      );
    }
  }

  async getVehicleById(id: number): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { id } });
      if (!vehicle) {
        this.logger.warn(`Vehicle with id ${id} not found`);
        throw new NotFoundException('Vehicle not found');
      }
      return vehicle;
    } catch (error) {
      this.errorHandlerService.handleServiceErrors(
        error,
        'getVehicleByVin',
        this.logger,
      );
    }
  }
}
