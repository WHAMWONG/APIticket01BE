import { EntityRepository, Repository } from 'typeorm';
import { CustomerSearch } from 'src/entities/customer_searches';

@EntityRepository(CustomerSearch)
export class CustomerSearchesRepository extends Repository<CustomerSearch> {
  async logCustomerSelection(userId: number, customerId: number): Promise<CustomerSearch> {
    const customerSearch = this.create({
      user_id: userId,
      search_criteria: `Customer ID: ${customerId}`,
      search_type: 'selection', // Assuming 'selection' is a valid enum value for search_type
    });

    try {
      await this.save(customerSearch);
      return customerSearch;
    } catch (error) {
      // Handle exceptions (e.g., log the error)
      throw new Error('Error logging customer selection');
    }
  }
}