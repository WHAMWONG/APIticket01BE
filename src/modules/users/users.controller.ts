import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/user-information')
  @Auth()
  async updateUserInformation(
    @CurrentUser() currentUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!currentUser || !currentUser.id) {
      return { status: 401, message: 'User not found or not logged in.' };
    }

    try {
      await this.usersService.updateUser(currentUser.id, updateUserDto);
      return {
        status: 200,
        message: 'Your information has been successfully updated.',
      };
    } catch (error) {
      if (error.status === 400) {
        return { status: 400, message: error.message };
      } else if (error.status === 422) {
        return { status: 422, message: error.message };
      } else {
        return { status: 500, message: 'An unexpected error has occurred on the server.' };
      }
    }
  }
}