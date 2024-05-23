import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { SearchCustomerDto } from './dto/search-customer.dto';
import { CustomerService } from './customers.service';
import { User } from 'src/entities/users';

@Controller('v1')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('customer-search')
  @Auth()
  async searchCustomer(
    @Query() searchCustomerDto: SearchCustomerDto,
    @CurrentUser() user: User
  ) {
    if (!searchCustomerDto.searchCriteria) {
      throw new HttpException('Search criteria is required.', HttpStatus.BAD_REQUEST);
    }
    if (!['name', 'katakana_name', 'email'].includes(searchCustomerDto.searchType)) {
      throw new HttpException("Invalid search type. Must be 'name', 'katakana_name', or 'email'.", HttpStatus.BAD_REQUEST);
    }

    searchCustomerDto.userId = user.id; // Set the user ID from the current user
    const customers = await this.customerService.searchCustomer(searchCustomerDto);

    if (customers instanceof Array && customers.length === 0) {
      throw new HttpException('No customer information found matching the search criteria.', HttpStatus.NOT_FOUND);
    }

    return {
      status: HttpStatus.OK,
      customers: customers,
      message: 'Customer information retrieved successfully.'
    };
  }
}