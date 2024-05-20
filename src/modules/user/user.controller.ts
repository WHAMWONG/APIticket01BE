import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UpdateUserInformationDto } from './dto/update-user-information.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('v2/user-information')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async updateUserInformation(
    @CurrentUser() user,
    @Body() updateUserInformationDto: UpdateUserInformationDto,
  ) {
    try {
      await this.userService.updateInformation(user, updateUserInformationDto);
      return {
        status: HttpStatus.OK,
        message: 'Your information has been updated.',
      };
    } catch (error) {
      if (error.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        return {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: error.message,
        };
      } else if (error.status === HttpStatus.BAD_REQUEST) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      } else {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected error has occurred on the server.',
        };
      }
    }
  }
}