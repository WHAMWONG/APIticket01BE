import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepository } from 'src/repositories/users.repository';
import { SubmissionFormRepository } from 'src/repositories/submission-forms.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SubmissionFormRepository)
    private submissionFormRepository: SubmissionFormRepository,
    private dataSource: DataSource,
  ) {}

  async updateUser(userId: number, updateUserData: UpdateUserDto): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.userRepository.update(userId, updateUserData);

      const submissionData = {
        user_id: userId,
        form_data: JSON.stringify(updateUserData),
        submission_status: 'submitted',
        submission_date: new Date(),
      };
      await this.submissionFormRepository.save(submissionData);

      await queryRunner.commitTransaction();

      return 'User information updated successfully.';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}