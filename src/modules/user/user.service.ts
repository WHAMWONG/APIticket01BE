import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { UpdateUserInformationDto } from './dto/update-user-information.dto';
import { User } from 'src/entities/users.ts';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateInformation(user: User, updateUserInformationDto: UpdateUserInformationDto): Promise<{ status: number; message: string }> {
    try {
      await this.userRepository.update(user.id, updateUserInformationDto);
      return { status: 200, message: 'Your information has been updated.' };
    } catch (error) {
      // Handle the error based on the type of error
      throw error;
    }
  }
}