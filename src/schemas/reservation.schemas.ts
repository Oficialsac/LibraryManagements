import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true })
  bookIsbn: string;

  @Prop({ required: true })
  userDocumentId: string;

  @Prop({ type: Date, required: true })
  reservationDate: Date;

  @Prop({ type: Date, required: true })
  expirationDate: Date;

  @Prop({ required: true })
  status: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
