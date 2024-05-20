import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity'; // Assuming User entity exists based on ERD
import { ValidateSubmissionDto } from './dto/validate-submission.dto';
import { validate } from 'class-validator';
import * as dayjs from 'dayjs';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateSubmission(dto: ValidateSubmissionDto): Promise<{ message: string }> {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed for one or more fields.');
    }

    const user = await this.userRepository.findOneBy({ id: dto.user_id });
    if (!user || !user.isLoggedIn) { // Assuming there is a field to check if user is logged in
      throw new BadRequestException('User must be registered and logged in.');
    }

    if (!this.validateEmail(dto.email)) {
      throw new BadRequestException('Invalid email format.');
    }

    if (!this.validatePhoneNumber(dto.phone_number)) {
      throw new BadRequestException('Invalid phone number format.');
    }

    if (!this.validateDate(dto.date_of_birth) || !this.validateDate(dto.contract_date)) {
      throw new BadRequestException('Invalid date format. Dates must be in YYYY-MM-DD format.');
    }

    return { message: 'Validation successful.' };
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(phoneNumber);
  }

  private validateDate(date: string): boolean {
    return dayjs(date, 'YYYY-MM-DD', true).isValid();
  }
}