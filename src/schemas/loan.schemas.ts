import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoanDocument = Loan & Document;

@Schema()
export class Loan {
  @Prop({ required: true })
  loanId: string;

  @Prop({ required: true })
  userDocumentId: string;

  @Prop({ required: true })
  bookIsbn: string;

  @Prop({ type: Date, required: true })
  checkoutDate: Date;

  @Prop({ type: Date, required: true })
  dueDate: Date;

  @Prop({ type: Date, default: null })
  returnDate: Date | null;

  @Prop({ required: true })
  loanStatus: string;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
