import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  readonly bookIsbn: string;

  @IsString()
  @IsNotEmpty()
  readonly userDocumentId: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly reservationDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly expirationDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly status: string;
}
