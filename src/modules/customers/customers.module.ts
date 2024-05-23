import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerInformation } from 'src/entities/customer_informations';
import { CustomerSearch } from 'src/entities/customer_searches';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerInformation, CustomerSearch])],
  providers: [CustomerService],
  controllers: [CustomersController],
})
export class CustomersModule {}