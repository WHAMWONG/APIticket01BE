import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CustomerInformation } from 'src/entities/customer_informations';
import { CustomerSearch } from 'src/entities/customer_searches';
import { SearchCustomerDto } from './dto/search-customer.dto';
import { dataSource } from 'src/database/data-source';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerInformation)
    private customerInformationRepository: Repository<CustomerInformation>,
    @InjectRepository(CustomerSearch) private customerSearchRepository: Repository<CustomerSearch>,
  ) {}

  async searchCustomer(searchCustomerDto: SearchCustomerDto) {
    const { searchCriteria, searchType, userId } = searchCustomerDto;

    // Validate user and permissions
    // This should be handled by the AuthGuard and CurrentUser decorator in the controller

    // Validate search criteria
    if (!searchCriteria) {
      throw new BadRequestException('Search criteria is required.');
    }

    // Validate search type
    if (!['name', 'katakana_name', 'email'].includes(searchType)) {
      throw new BadRequestException("Invalid search type. Must be 'name', 'katakana_name', or 'email'.");
    }

    // Construct dynamic query
    const searchColumn = {
      'name': 'name',
      'katakana_name': 'katakana_name',
      'email': 'email'
    }[searchType];
    const whereCondition = { [searchColumn]: Like(`%${searchCriteria}%`) };

    // Execute search query
    const customers = await this.customerInformationRepository.find({
      where: whereCondition,
    });

    // Check if customers were found
    if (customers.length === 0) {
      throw new NotFoundException('No customer information found matching the search criteria.');
    }

    // Prepare success response
    const response = {
      status: HttpStatus.OK,
      customers: customers,
      message: 'Customer information retrieved successfully.'
    };

    // Log the search query and result count
    await this.customerSearchRepository.save({
      searchCriteria,
      searchType,
      user: { id: userId },
      resultCount: customers.length,
    });

    // Return the response
    return response;
  }
}