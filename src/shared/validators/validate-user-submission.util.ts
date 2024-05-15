import { User } from '@entities/users';
import { UserRepository } from '@repositories/users.repository';
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
  const errors: string[] = [];
  let isValid = true;

  // Validate username
  if (!username || username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push('Username must be between 3 and 20 characters long and contain only alphanumeric characters and underscores.');
    isValid = false;
  }

  // Validate email
  if (!email || !validateEmail(email)) {
    errors.push('Email is invalid.');
    isValid = false;
  } else {
    const userRepository = new UserRepository(); // Assuming UserRepository can be instantiated like this
    const entityUniqueValidator = new EntityUniqueValidator(); // Assuming EntityUniqueValidator can be instantiated like this
    const isEmailUnique = await entityUniqueValidator.validate(email, {
      constraints: [User],
      property: 'email',
      object: { email },
    });
    if (!isEmailUnique) {
      errors.push('Email already exists.');
      isValid = false;
    }
  }

  // Validate submissionData
  const submissionDataInstance = plainToInstance(SubmissionDataDto, submissionData);
  const validationErrors: ValidationError[] = await validate(submissionDataInstance);
  if (validationErrors.length > 0) {
    validationErrors.forEach((error: ValidationError) => {
      errors.push(`Field ${error.property}: ${Object.values(error.constraints).join(', ')}`);
    });
    isValid = false;
  }

  return { errors, isValid };
}