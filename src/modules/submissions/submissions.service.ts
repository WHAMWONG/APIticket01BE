import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionRepository } from 'src/repositories/submissions.repository';
import { ValidateSubmissionDto } from './dto/validate-submission.dto';
import { Submission } from 'src/entities/submissions';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(SubmissionRepository)
    private submissionRepository: SubmissionRepository,
  ) {}

  async submitForm(validateSubmissionDto: ValidateSubmissionDto): Promise<{ submissionStatus: 'ready' | 'failed'; errors?: { field: string; message: string }[]; }> {
    // Step 1: Call the "validateSubmission" function with the input DTO fields.
    const validationResults = await this.validateSubmission(validateSubmissionDto);

    // Step 2: If the validation fails, return an object with "submissionStatus" set to 'failed' and the validation "errors".
    if (validationResults.errors.length > 0) {
      return {
        submissionStatus: 'failed',
        errors: validationResults.errors,
      };
    }

    // Step 3: If the validation passes, create a new "Submission" entity with the "submission_data" and other relevant fields, and save it to the database using "SubmissionRepository".
    const submission = this.submissionRepository.create({
      submission_data: validateSubmissionDto.submission_data,
      // Add other relevant fields here
      submission_status: 'pending', // Assuming 'pending' is a valid status
      // user_id: ... (should be set based on the current user context)
      // submission_form_id: ... (should be set based on the form being submitted)
    });
    await this.submissionRepository.save(submission);

    // Step 4: Return an object with "submissionStatus" set to 'ready' if the form submission is successful.
    return {
      submissionStatus: 'ready',
    };
  }

  private async validateSubmission(validateSubmissionDto: ValidateSubmissionDto): Promise<{ errors: { field: string; message: string }[] }> {
    // Implement the validation logic here
    // This is a placeholder for the actual validation function
    // You should replace this with the actual validation logic
    return { errors: [] };
  }
}