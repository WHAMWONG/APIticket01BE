import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users.ts';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { dataSource } from 'src/database/data-source.ts';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @CurrentUser()
  async verifyMainMenuAccess() {
    const currentUser = CurrentUser();
    if (!currentUser) {
      throw new ForbiddenException('User not found or not logged in.');
    }

    const user = await this.userRepository.findOneBy({
      id: currentUser.user_id,
      is_logged_in: true,
    });

    if (!user) {
      throw new ForbiddenException('User not found or not logged in.');
    }

    // Assuming roles or permissions are stored in a separate table or service
    // This is a placeholder for the actual permission check logic
    const hasAccess = this.checkUserPermissions(user);

    if (!hasAccess) {
      throw new ForbiddenException('User does not have permission to access the main menu.');
    }

    return true;
  }

  // Placeholder for actual permission check logic
  private checkUserPermissions(user: User): boolean {
    // Implement the logic to check if the user has the required role or permissions
    // Return true if the user has access, false otherwise
    return true; // This should be replaced with actual permission checking logic
  }
}