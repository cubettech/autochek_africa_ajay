import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { LoanStatus } from './loan-application.constant';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Entity('loan-application')
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.loanApplications)
  vehicle: Vehicle;

  @Column()
  loanAmount: number;

  @Column({
    type: 'text',
    default: LoanStatus.Pending,
  })
  status: string;

  @Column()
  applicationDate: Date;
}
