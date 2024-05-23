import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.ts';
import { CustomerInformation } from 'src/entities/customer_informations.ts';
import { CustomerSearch } from 'src/entities/customer_searches.ts';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CustomerInformation)
    private customerInformationRepository: Repository<CustomerInformation>,
    @InjectRepository(CustomerSearch)
    private customerSearchRepository: Repository<CustomerSearch>,
  ) {}

  async recordCustomerSelection(customerId: number, userId: number): Promise<CustomerInformation> {
    try {
      // Validate that the user exists and has permission to view customer details
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      // TODO: Check if the user has permission to view customer details

      // Retrieve the full details of the customer
      const customer = await this.customerInformationRepository.findOneBy({ id: customerId });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customerId} not found.`);
      }

      // Log the action of selecting a customer record
      const customerSearch = this.customerSearchRepository.create({
        search_criteria: `Customer ID: ${customerId}`,
        search_type: 'SELECT', // Assuming 'SELECT' is a valid enum value for search_type
        user_id: userId,
      });
      await this.customerSearchRepository.save(customerSearch);

      // Return the detailed customer information
      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new ForbiddenException('An error occurred while recording customer selection.');
    }
  }
}