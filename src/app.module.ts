import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoansModule } from './loans/loans.module';
import { ReservationModule } from './reservation/reservation.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BooksModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/innovati-library-management-system',
    ),
    LoansModule,
    ReservationModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
