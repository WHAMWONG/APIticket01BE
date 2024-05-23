import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.ts';
import { Auth } from 'src/decorators/auth.decorator.ts';
import { RedirectUserDto } from './dtos/redirect-user.dto.ts';
import { PermissionsService } from 'src/shared/permissions/permissions.service.ts';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private permissionsService: PermissionsService,
  ) {}

  @Auth()
  async redirectUser(redirectUserDto: RedirectUserDto): Promise<{ status: number; redirect_url: string }> {
    // Validate that the user_id corresponds to an existing user
    const user = await this.userRepository.findOneBy({ id: redirectUserDto.user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user has permission to access the selected_option
    const hasPermission = await this.permissionsService.checkPermissions(redirectUserDto.user_id);
    if (!hasPermission) {
      throw new ForbiddenException('User does not have permission to access this option');
    }

    const menuOptions = {
      'New Customer': '/new-customer',
      'Search Contracts': '/search-contracts',
      'Update Customer Attributes': '/update-customer-attributes',
      'Address Update': '/address-update',
    };

    // Determine the corresponding section of the system to redirect to
    const redirectUrl = menuOptions[redirectUserDto.selected_option];
    if (!redirectUrl) {
      throw new NotFoundException('Invalid menu option selected.');
    }

    // Log the user's navigation action for audit purposes
    console.log(`User ${redirectUserDto.user_id} navigated to ${redirectUserDto.selected_option}`);

    // Return a redirect response to the appropriate section
    return { status: 200, redirect_url: redirectUrl };
  }
}