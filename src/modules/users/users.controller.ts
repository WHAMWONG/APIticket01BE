import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResetSearchCriteriaDto } from './dto/reset-search-criteria.dto';
import { Auth } from '../../decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ... other endpoints ...

  @Post('reset-search-criteria')
  @Auth()
  async resetSearchCriteria(@Body() resetSearchCriteriaDto: ResetSearchCriteriaDto) {
    try {
      const result = await this.usersService.resetSearchCriteria(resetSearchCriteriaDto.userId);
      return result;
    } catch (error) {
      throw error;
    }
  }
}