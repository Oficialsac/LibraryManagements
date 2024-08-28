import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop()
  publisher: string;

  @Prop()
  publicationDate: Date;

  @Prop()
  genre: string;

  @Prop()
  language: string;

  @Prop()
  numberOfPages: number;

  @Prop()
  coverType: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
