import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/users';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkPermissions(user_id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });

    if (!user || !user.is_logged_in) {
      return false;
    }

    // Placeholder for permission check logic
    // TODO: Implement actual permission check based on user's role
    const hasAccessToMainMenu = true; // This should be determined by user's role or permissions

    return hasAccessToMainMenu;
  }
}