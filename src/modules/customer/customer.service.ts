import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.ts';
import { CustomerInformation } from 'src/entities/customer_informations.ts';
import { CustomerSearch } from 'src/entities/customer_searches.ts';
import { RecordCustomerSelectionDto } from './dto/record-customer-selection.dto'; // Imported DTO

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

  // Method signature updated to accept RecordCustomerSelectionDto
  async recordCustomerSelection(dto: RecordCustomerSelectionDto): Promise<CustomerInformation> {
    try {
      // Validate that the user exists and is logged in
      const user = await this.userRepository.findOneBy({ id: dto.userId });
      if (!user) {
        throw new NotFoundException(`User not found or not logged in.`);
      }

      // Retrieve the full details of the customer
      const customer = await this.customerInformationRepository.findOneBy({ id: dto.customerId });
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${dto.customerId} not found.`);
      }

      // Log the action of selecting a customer record
      const customerSearch = this.customerSearchRepository.create({
        search_criteria: `Customer ID: ${dto.customerId}`,
        search_type: 'SELECT', // Assuming 'SELECT' is a valid enum value for search_type
        user_id: dto.userId,
      });
      await this.customerSearchRepository.save(customerSearch);

      // Return the detailed customer information
      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException to be handled by the controller
      }
      throw new ForbiddenException('An error occurred while recording customer selection.');
    }
  }
}