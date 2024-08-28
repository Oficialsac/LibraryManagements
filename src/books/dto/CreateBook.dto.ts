import { IsString, IsNotEmpty, IsISBN, IsOptional, IsDate, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsISBN()
  @IsNotEmpty()
  readonly isbn: string;

  @IsString()
  @IsOptional()
  readonly publisher?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly publicationDate?: Date;

  @IsString()
  @IsOptional()
  readonly genre?: string;

  @IsString()
  @IsOptional()
  readonly language?: string;

  @IsInt()
  @IsOptional()
  readonly numberOfPages?: number;

  @IsEnum(['Hardcover', 'Paperback'])
  @IsOptional()
  readonly coverType?: string;
}
