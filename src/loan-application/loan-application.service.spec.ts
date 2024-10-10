import { Test, TestingModule } from '@nestjs/testing';
import { LoanApplicationService } from './loan-application.service';
import { LoanApplication } from './loan-application.entity';
import { NotFoundException } from '@nestjs/common';
import { LoanStatus } from './loan-application.constant';

describe('LoanApplicationService', () => {
  let service: LoanApplicationService;

  const mockLoanApplicationRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockLoanApplication = {
    vehicleId: 1,
    downPayment: 10000,
    loanTerm: 12,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanApplicationService,
        {
          provide: 'LoanApplicationRepository',
          useValue: mockLoanApplicationRepository,
        },
      ],
    }).compile();

    service = module.get<LoanApplicationService>(LoanApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('applyForLoan', () => {
    it('should create a loan application successfully', async () => {
      mockLoanApplicationRepository.save.mockResolvedValue(mockLoanApplication);
      const result = await service.applyForLoan(mockLoanApplication);
      expect(result).toEqual(mockLoanApplication);
      expect(mockLoanApplicationRepository.save).toHaveBeenCalledWith(
        mockLoanApplication,
      );
    });
  });

  describe('updateLoanStatus', () => {
    it('should throw NotFoundException if loan application does not exist', async () => {
      mockLoanApplicationRepository.findOne.mockResolvedValue(null);
      await expect(
        service.updateLoanStatus({
          applicationId: 1,
          status: LoanStatus.Approved,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
