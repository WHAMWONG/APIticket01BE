import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities/users';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/main-menu/redirect')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async redirect(@CurrentUser() user: User, @Body() body: { user_id: number; selected_option: string }) {
    const { user_id, selected_option } = body;

    // Validate user_id and selected_option before proceeding
    if (user.id !== user_id) {
      return {
        status: HttpStatus.UNAUTHORIZED,
        message: 'User not found or unauthorized.',
      };
    }

    const validOptions = ['New Customer', 'Search Contracts', 'Update Customer Attributes', 'Address Update'];
    if (!validOptions.includes(selected_option)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid menu option selected.',
      };
    }

    try {
      const redirectUrl = await this.authService.redirectUser(user, selected_option);
      return {
        status: HttpStatus.OK,
        redirect_url: redirectUrl,
      };
    } catch (error) {
      if (error.status === HttpStatus.FORBIDDEN) {
        return {
          status: HttpStatus.FORBIDDEN,
          message: error.response,
        };
      } else if (error.status === HttpStatus.NOT_FOUND) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: error.response,
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