import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLoanDto {
  @IsString()
  @IsNotEmpty()
  readonly loanId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly bookIsbn: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly checkoutDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly dueDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly returnDate: Date | null;

  @IsString()
  @IsNotEmpty()
  readonly loanStatus: string;
}
