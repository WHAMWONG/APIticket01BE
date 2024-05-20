import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { SubmissionForm } from 'src/entities/submission_form.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { dataSource } from 'src/database/data-source';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SubmissionForm)
    private submissionFormRepository: Repository<SubmissionForm>,
  ) {}

  async updateUser(userId: number, updateUserData: UpdateUserDto): Promise<string> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.getRepository(User).update(userId, updateUserData);

      const submissionData = {
        user_id: userId,
        form_data: JSON.stringify(updateUserData),
        submission_status: 'submitted',
        submission_date: new Date(),
      };
      await queryRunner.manager.getRepository(SubmissionForm).save(submissionData);

      await queryRunner.commitTransaction();

      return 'User information updated successfully.';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}