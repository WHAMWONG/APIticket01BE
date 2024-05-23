import { Injectable } from '@nestjs/common';
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
    @InjectRepository(CustomerSearch)
    private customerSearchRepository: Repository<CustomerSearch>,
  ) {}

  async searchCustomer(searchCustomerDto: SearchCustomerDto) {
    const { searchCriteria, searchType, userId } = searchCustomerDto;

    // Validate user and permissions
    // This should be handled by the AuthGuard and CurrentUser decorator in the controller

    // Construct dynamic query
    const searchColumn = searchType === 'name' ? 'name' : searchType === 'katakana_name' ? 'katakana_name' : 'email';
    const whereCondition = { [searchColumn]: Like(`%${searchCriteria}%`) };

    // Execute search query
    const customers = await this.customerInformationRepository.find({
      where: whereCondition,
    });

    // Format results or prepare no matches message
    const result = customers.length > 0 ? customers : 'No matches found';

    // Log the search query and result count
    await this.customerSearchRepository.save({
      searchCriteria,
      searchType,
      user: { id: userId },
      resultCount: customers.length,
    });

    // Return the response
    return result;
  }
}