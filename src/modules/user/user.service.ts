import { Injectable } from '@nestjs/common';
import { validateUserSubmission } from '/src/shared/validators/validate-user-submission.util';
import { User } from 'src/entities/users';

@Injectable()
export class UserService {
  // ... other methods and properties of UserService

  async validateUserInformationSubmission(username: string, email: string, submissionData: any) {
    const validationResult = validateUserSubmission(username, email, submissionData);

    if (!validationResult.isValid) {
      // Prepare a response with field names and specific error messages
      const response = validationResult.errors.map(error => ({
        field: error.field,
        message: error.message
      }));
      return { errors: response, isValid: false };
    }

    // Prepare a success response
    return { message: 'All fields are valid', isValid: true };
  }
}