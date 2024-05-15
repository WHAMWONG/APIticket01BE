import { Injectable } from '@nestjs/common';
import { validateUserSubmission } from 'src/shared/validators/validate-user-submission.util';
import { ValidateUserSubmissionDto } from 'src/modules/user/dto/validate-user-submission.dto';
import { User } from 'src/entities/users';
import { EntityUniqueValidator } from 'src/shared/validators/entity-unique.validator';

@Injectable()
export class UserService {
  // ... other methods and properties of UserService

  async validateUserInformationSubmission(validateUserSubmissionDto: ValidateUserSubmissionDto) {
    const validationResult = validateUserSubmission(
      validateUserSubmissionDto.username,
      validateUserSubmissionDto.email,
      validateUserSubmissionDto.submissionData
    );

    if (!validationResult.isValid) {
      // Prepare a response with field names and specific error messages
      const response = validationResult.errors.map(error => ({
        field: error.field,
        message: error.message
      }));
      
      // Check if the email is unique
      const emailUnique = await new EntityUniqueValidator().validate(validateUserSubmissionDto.email, {
        constraints: [User],
        property: 'email',
        object: { email: validateUserSubmissionDto.email }
      });
      if (!emailUnique) {
        response.push({ field: 'email', message: 'Email must be unique.' });
      }
      return { errors: response, isValid: false };
    }

    // Prepare a success response
    return { message: 'All fields are valid', isValid: true };
  }

  // ... other methods and properties of UserService
}