import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/entities/users';
import { CustomerSearch } from 'src/entities/customer_searches';

@Module({
  imports: [TypeOrmModule.forFeature([User, CustomerSearch])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}