import { Vehicle } from '..//vehicle/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Valuation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string; // Unique identifier from API

  @Column()
  loanValue: number;

  @Column()
  tradeInValue: number;

  @Column()
  adjustedTradeInValue: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  retailValue: number;

  @Column()
  msrpValue: number;

  @Column()
  averageTradeIn: number;

  @Column()
  mileageAdjustment: number;

  @Column()
  valuationDate: Date; // Date when valuation was done

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.valuations)
  vehicle: Vehicle;
}
