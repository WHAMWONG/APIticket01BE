import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.ts';
import { CustomerSearch } from 'src/entities/customer_searches.ts';
import { SuccessResponseDTO } from 'src/shared/response/success-response.dto.ts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CustomerSearch)
    private customerSearchRepository: Repository<CustomerSearch>
  ) {}

  async resetSearchCriteria(userId: number): Promise<SuccessResponseDTO> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    // Assuming there's a method to check if the user has permission to reset search criteria
    if (!user.canResetSearchCriteria()) {
      throw new ForbiddenException('User does not have permission to reset search criteria.');
    }
    await this.customerSearchRepository.delete({ user_id: userId });
    return new SuccessResponseDTO('Search criteria have been reset successfully.');
  }
}