import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepository } from 'src/repositories/users.repository';
import { SubmissionFormRepository } from 'src/repositories/submission-forms.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { SubmissionsService } from '../submissions/submissions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SubmissionFormRepository)
    private submissionFormRepository: SubmissionFormRepository,
    private dataSource: DataSource,
    private submissionsService: SubmissionsService,
  ) {}

  async updateUser(userId: number, updateUserData: UpdateUserDto): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate the submission form before updating user information
      await this.submissionsService.validateSubmissionForm(updateUserData);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Validation failed.');
    }

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

      return 'Your information has been successfully updated.';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}