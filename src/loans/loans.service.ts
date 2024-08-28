import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan, LoanDocument } from './../schemas/loan.schemas';
import { CreateLoanDto } from './dto/CreateLoan.dto';

@Injectable()
export class LoansService {
  constructor(@InjectModel(Loan.name) private loanModel: Model<Loan>) {}

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    const createdLoan = new this.loanModel(createLoanDto);
    return createdLoan.save();
  }

  async findAll(): Promise<Loan[]> {
    return this.loanModel.find().exec();
  }

  async findOne(id: string): Promise<Loan> {
    const loan = await this.loanModel.findById(id).exec();
    if (!loan) {
      throw new NotFoundException(`Loan with ID "${id}" not found`);
    }
    return loan;
  }

  async update(id: string, updateLoanDto: CreateLoanDto): Promise<Loan> {
    const updatedLoan = await this.loanModel
      .findByIdAndUpdate(id, updateLoanDto, { new: true })
      .exec();
    if (!updatedLoan) {
      throw new NotFoundException(`Loan with ID "${id}" not found`);
    }
    return updatedLoan;
  }

  async remove(id: string): Promise<void> {
    const result = await this.loanModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Loan with ID "${id}" not found`);
    }
  }
}
