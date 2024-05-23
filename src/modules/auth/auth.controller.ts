import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities/users.ts';
import { VerifyMainMenuAccessDto } from './dto/verify-main-menu-access.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/api/main-menu/verify-access')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async verifyMainMenuAccess(@Query() verifyMainMenuAccessDto: VerifyMainMenuAccessDto, @CurrentUser() currentUser: User) {
    const user = await this.authService.userRepository.findOneBy({ id: verifyMainMenuAccessDto.user_id });
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User not found.'
      };
    }

    if (!user.is_logged_in) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'User is not logged in.'
      };
    }

    // Assuming checkPermissions is a method in AuthService that checks if the user has access to the main menu
    const hasAccess = await this.authService.checkPermissions(user.id, 'main-menu');
    if (!hasAccess) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'User does not have access to the main menu.'
      };
    }

    return {
      status: HttpStatus.OK,
      has_access: true
    };
  }
}