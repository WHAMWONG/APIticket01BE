import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.ts';
import { CustomerInformation } from 'src/entities/customer_informations.ts';
import { CustomerSearch } from 'src/entities/customer_searches.ts';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, CustomerInformation, CustomerSearch])],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}