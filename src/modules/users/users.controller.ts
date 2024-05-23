import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResetSearchCriteriaDto } from './dto/reset-search-criteria.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ... other endpoints ...

  @Post('reset-search-criteria')
  async resetSearchCriteria(@Body() resetSearchCriteriaDto: ResetSearchCriteriaDto) {
    const result = await this.usersService.resetSearchCriteria(resetSearchCriteriaDto.userId);
    return result;
  }
}