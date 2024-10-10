import { LoanApplication } from '../loan-application/loan-application.entity';
import { Valuation } from '../valuation/valuation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vin: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @OneToMany(() => Valuation, (valuation) => valuation.vehicle)
  valuations: Valuation[];

  @OneToMany(
    () => LoanApplication,
    (loanApplication) => loanApplication.vehicle,
  )
  loanApplications: Valuation[];
}
