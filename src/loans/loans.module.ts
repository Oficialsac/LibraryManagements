import { Module } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from 'src/schemas/loan.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
  ],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
