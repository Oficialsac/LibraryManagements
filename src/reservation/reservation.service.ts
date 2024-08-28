import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from './../schemas/reservation.schemas';
import { CreateReservationDto } from './dto/CreateReservation.dto';
import { ObjectId, Types } from 'mongoose';
@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<Reservation>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    console.log('Im here');

    const createdReservation = new this.reservationModel(createReservationDto);
    return createdReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }

  async findReservationsByUser(id: string): Promise<Reservation[]> {
    let objectId: Types.ObjectId;

    try {
      objectId = new Types.ObjectId(id);
    } catch (error) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    console.log(objectId._id, objectId._bsontype);

    const reservation = await this.reservationModel
      .find({ userDocumentId: objectId._id })
      .exec();
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID "${objectId._id}" not found`,
      );
    }
    return reservation;
  }

  async update(
    id: string,
    updateReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const updatedReservation = await this.reservationModel
      .findByIdAndUpdate(id, updateReservationDto, { new: true })
      .exec();
    if (!updatedReservation) {
      throw new NotFoundException(`Reservation with ID "${id}" not found`);
    }
    return updatedReservation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.reservationModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .exec();
    if (!result) {
      throw new NotFoundException(`Reservation with ID "${id}" not found`);
    }
  }
}
