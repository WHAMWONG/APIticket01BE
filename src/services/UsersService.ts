import { dataSource } from '../database/data-source';
import { User } from '../entities/users';
import { SubmissionForm } from '../entities/submission_forms';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UsersService {
  async updateUser(updateUserDto: UpdateUserDto): Promise<string> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { user_id, name, gender, department, employee_number, address, phone_number, email, date_of_birth, contract_date } = updateUserDto;
      
      // Update user information
      await queryRunner.manager.update(User, user_id, {
        name,
        gender,
        department,
        employee_number,
        address,
        phone_number,
        email,
        date_of_birth,
        contract_date
      });

      // Create a new submission form entry
      const submissionForm = new SubmissionForm();
      submissionForm.user = { id: user_id } as User;
      submissionForm.form_data = JSON.stringify(updateUserDto);
      submissionForm.submission_status = 'submitted';
      submissionForm.submission_date = new Date();
      await queryRunner.manager.save(submissionForm);

      // Commit transaction
      await queryRunner.commitTransaction();

      return 'User information updated successfully.';
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner which is manually created
      await queryRunner.release();
    }
  }
}