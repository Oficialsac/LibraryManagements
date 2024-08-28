import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/book.schemas';
import { CreateBookDto } from './dto/CreateBook.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(createBookDto: CreateBookDto) {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(isbn: string): Promise<Book> {
    return this.bookModel.findOne({ isbn }).exec();
  }

  async update(isbn: string, updateBookDto: any): Promise<Book> {
    return this.bookModel
      .findOneAndUpdate({ isbn }, updateBookDto, { new: true })
      .exec();
  }

  async remove(isbn: string): Promise<Book> {
    return this.bookModel.findOneAndDelete({ isbn }).exec();
  }
}
