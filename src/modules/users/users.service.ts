import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository, Transaction, TransactionRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.ts';
import { CustomerSearch } from 'src/entities/customer_searches.ts';
import { SuccessResponseDTO } from 'src/shared/response/success-response.dto.ts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CustomerSearch)
    private readonly customerSearchRepository: Repository<CustomerSearch>
  ) {}

  @Transaction()
  async resetSearchCriteria(userId: number, @TransactionRepository(User) userRepo?: Repository<User>, @TransactionRepository(CustomerSearch) customerSearchRepo?: Repository<CustomerSearch>): Promise<SuccessResponseDTO> {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user || !user.is_logged_in) {
      throw new NotFoundException('User not found or not logged in.');
    }
    // Assuming there's a method to check if the user has permission to reset search criteria
    if (!user.canResetSearchCriteria()) {
      throw new ForbiddenException('User does not have permission to reset search criteria.');
    }
    await customerSearchRepo.delete({ user_id: userId });
    return new SuccessResponseDTO('Search criteria has been reset successfully.');
  }
}