import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/users.repository';
import { SubmissionFormRepository } from 'src/repositories/submission-forms.repository';
import { BadRequestException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { isEmail, isPhoneNumber } from 'class-validator';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly submissionFormRepository: SubmissionFormRepository,
  ) {}

  async validateSubmissionForm(formData: any): Promise<string> {
    // Validate user_id
    const user = await this.userRepository.findOne({ where: { id: formData.user_id } });
    if (!user || !user.is_logged_in) {
      throw new BadRequestException('Invalid user_id or user is not logged in.');
    }

    // Validate required fields
    const requiredFields = [
      'name', 'gender', 'department', 'employee_number', 'address', 
      'phone_number', 'email', 'date_of_birth', 'contract_date'
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        throw new BadRequestException(`Field ${field} is required and cannot be empty.`);
      }
    }

    // Validate email format
    if (!isEmail(formData.email)) {
      throw new BadRequestException('Invalid email format.');
    }

    // Validate phone number format
    if (!isPhoneNumber(formData.phone_number)) {
      throw new BadRequestException('Invalid phone number format.');
    }

    // Validate date_of_birth and contract_date format
    const dateFormat = 'YYYY-MM-DD';
    if (!dayjs(formData.date_of_birth, dateFormat).isValid()) {
      throw new BadRequestException('Invalid date_of_birth format. Use YYYY-MM-DD.');
    }
    if (!dayjs(formData.contract_date, dateFormat).isValid()) {
      throw new BadRequestException('Invalid contract_date format. Use YYYY-MM-DD.');
    }

    return 'Validation successful.';
  }
}