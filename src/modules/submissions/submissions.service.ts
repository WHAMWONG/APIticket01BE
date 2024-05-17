import { Injectable } from '@nestjs/common';
import { SubmissionRepository } from 'src/repositories/submissions.repository';
import { validateUserSubmission } from 'src/shared/validators/validate-user-submission.util';
import { Submission } from 'src/entities/submissions';
import { EntityUniqueValidator } from 'src/shared/validators/entity-unique.validator';

export class SubmissionValidationDto {
  username: string;
  email: string;
  submissionData: string;
}

export class SubmissionValidationResultDto {
  isValid: boolean;
  errors?: { field: string; message: string }[];
}

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly submissionRepository: SubmissionRepository,
    private readonly entityUniqueValidator: EntityUniqueValidator,
  ) {}

  // This method has been updated to include the new validation logic
  async validateSubmission(dto: SubmissionValidationDto): Promise<SubmissionValidationResultDto> {
    const errors: { field: string; message: string }[] = [];

    // Validate username
    if (!dto.username || dto.username.trim().length === 0) {
      errors.push({ field: 'username', message: 'Username cannot be empty' });
    } else if (!/^[a-zA-Z0-9_]+$/.test(dto.username)) {
      errors.push({ field: 'username', message: 'Username contains invalid characters' });
    }

    // Validate email
    if (!dto.email || dto.email.trim().length === 0) {
      errors.push({ field: 'email', message: 'Email cannot be empty' });
    } else if (!/\S+@\S+\.\S+/.test(dto.email)) {
      errors.push({ field: 'email', message: 'Email is not valid' });
    }

    // Perform additional validation using the validateUserSubmission function
    const { errors: submissionErrors, isValid } = await validateUserSubmission(dto.username, dto.email, dto.submissionData);
    if (!isValid) {
      errors.push(...submissionErrors.map(error => ({ field: 'submissionData', message: error })));
    }

    // Set the form submission status based on validation result
    const submissionStatus = isValid ? 'ready for submission' : 'validation failed';

    // Add more business logic validation for submissionData if needed

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
  // Additional methods and logic can be added here as needed
}