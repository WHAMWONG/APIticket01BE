import { User } from '@entities/users';
import { SubmissionsService } from 'src/modules/submissions/submissions.service';
import { EntityUniqueValidator } from './entity-unique.validator';
import { validate as validateEmail } from 'email-validator';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export class SubmissionDataDto {
  // Define the expected fields and their validation rules
  // This is an example, actual fields and rules should be based on the application's requirements
  // @IsString()
  // @IsNotEmpty()
  // fieldName: string;
}

export async function validateUserSubmission(username: string, email: string, submissionData: any) {
  const errors: { field: string; message: string }[] = [];
  let isValid = true;

  // Validate username
  if (!username || username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push({ field: 'username', message: 'Username must be between 3 and 20 characters long and contain only alphanumeric characters and underscores.' });
    isValid = false;
  }

  // Validate email
  if (!email || !validateEmail(email)) {
    errors.push({ field: 'email', message: 'Email is invalid.' });
    isValid = false;
  } else {
    const submissionsService = new SubmissionsService(); // Assuming SubmissionsService can be instantiated like this
    const entityUniqueValidator = new EntityUniqueValidator(); // Assuming EntityUniqueValidator can be instantiated like this
    const isEmailUnique = await entityUniqueValidator.validate(email, {
      constraints: [User],
      property: 'email',
      object: { email },
    });
    if (!isEmailUnique) {
      errors.push({ field: 'email', message: 'Email already exists.' });
      isValid = false;
    }
  }

  // Validate submissionData
  const submissionDataInstance = plainToInstance(SubmissionDataDto, submissionData);
  const validationErrors: ValidationError[] = await validate(submissionDataInstance);
  if (validationErrors.length > 0) {
    validationErrors.forEach(error => {
      const message = `Field ${error.property}: ${Object.values(error.constraints).join(', ')}`;
      errors.push({ field: error.property, message });
    });
    isValid = false;
  }

  // Return the validation result
  return isValid ? { isValid } : { errors, isValid: false };
}