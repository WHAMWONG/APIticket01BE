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

  async validateSubmission(dto: SubmissionValidationDto): Promise<SubmissionValidationResultDto> {
    const validationResult = await validateUserSubmission(dto.username, dto.email, dto.submissionData);
    const errors = validationResult.errors.map(error => {
      const [field, message] = error.split(': ');
      return { field, message };
    });

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}