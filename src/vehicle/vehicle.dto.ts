import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  name: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  vin: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  make: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  model: string;
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  year: number;
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  mileage: number;
}