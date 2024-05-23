import { Injectable, NotFoundException, ForbiddenException, RedirectResponse } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.ts';
import { Auth } from 'src/decorators/auth.decorator.ts';
import { CurrentUser } from 'src/decorators/current-user.decorator.ts';
import { PermissionsService } from 'src/shared/permissions/permissions.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private permissionsService: PermissionsService,
  ) {}

  @Auth()
  async redirectUser(@CurrentUser() currentUser: User, selected_option: string): Promise<RedirectResponse> {
    // Validate that the user_id corresponds to an existing user
    const user = await this.userRepository.findOneBy({ id: currentUser.id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user has permission to access the selected_option
    const hasPermission = await this.permissionsService.checkPermissions(currentUser.id);
    if (!hasPermission) {
      throw new ForbiddenException('User does not have permission to access this option');
    }

    // Determine the corresponding section of the system to redirect to
    let redirectUrl;
    switch (selected_option) {
      case 'profile':
        redirectUrl = '/profile';
        break;
      case 'settings':
        redirectUrl = '/settings';
        break;
      // Add more cases as needed for other options
      default:
        throw new NotFoundException('Selected option is not valid');
    }

    // Log the user's navigation action for audit purposes
    console.log(`User ${currentUser.id} navigated to ${selected_option}`);

    // Return a redirect response to the appropriate section
    return new RedirectResponse(redirectUrl);
  }

  async checkPermissions(user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (!user.is_logged_in) {
      throw a ForbiddenException('User is not logged in.');
    }

    const hasAccess = await this.permissionsService.checkPermissions(user_id);
    if (!hasAccess) throw a ForbiddenException('User does not have access to the main menu.');

    return true;
  }
}