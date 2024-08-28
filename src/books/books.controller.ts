import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/CreateBook.dto';
import { MongooseError } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@ApiBearerAuth()
@ApiTags('Books Controller')
@Controller('books')
export class BooksController {
  constructor(private BooksService: BooksService) {}

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    console.log(createBookDto);
    try {
      return this.BooksService.createBook(createBookDto);
    } catch (error) {
      throw new MongooseError(error);
    }
  }

  @Get()
  async findAll() {
    return this.BooksService.findAll();
  }

  @Get(':isbn')
  async findOne(@Param('isbn') isbn: string) {
    return this.BooksService.findOne(isbn);
  }

  @Put(':isbn')
  async update(@Param('isbn') isbn: string, @Body() updateBookDto: any) {
    return this.BooksService.update(isbn, updateBookDto);
  }

  @Delete(':isbn')
  async remove(@Param('isbn') isbn: string) {
    return this.BooksService.remove(isbn);
  }
}
