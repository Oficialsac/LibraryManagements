import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  memberShipStatus?: string;

  @Prop({required: true})
  documentId: string;

  @Prop({required: true})
  name: string;

  @Prop()
  lastName?: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
