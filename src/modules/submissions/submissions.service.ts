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
    // Use the shared validateUserSubmission utility function
    const { errors, isValid } = await validateUserSubmission(dto.username, dto.email, dto.submissionData);

    // Prepare the response
    const validationResult = new SubmissionValidationResultDto();
    validationResult.isValid = isValid;
    if (!isValid) {
      validationResult.errors = errors.map(error => ({ field: error.split(' ')[0], message: error }));
    }

    return validationResult;
  }
}