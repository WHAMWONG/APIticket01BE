import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { User } from 'src/entities/users';
import { plainToClass } from 'class-transformer';
import { validate as validateEmail } from 'email-validator';

interface SubmissionData {
  username: string;
  email: string;
  // Add other required fields from submission_data here
}

@ValidatorConstraint({ async: true })
export class IsSubmissionDataValidConstraint implements ValidatorConstraintInterface {
  async validate(submissionData: any, args: ValidationArguments) {
    if (typeof submissionData !== 'object') {
      return false;
    }

    const data = plainToClass(SubmissionData, submissionData);
    const errors = [];

    // Validate 'username'
    if (!data.username || data.username.trim().length < 3 || data.username.trim().length > 20) {
      errors.push({ field: 'username', message: 'Username must be between 3 and 20 characters long.' });
    }

    // Validate 'email'
    if (!data.email || !validateEmail(data.email)) {
      errors.push({ field: 'email', message: 'Email format is invalid.' });
    } else {
      // Check if email is unique in 'users' table
      const emailExists = await User.findOne({ where: { email: data.email } });
      if (emailExists) {
        errors.push({ field: 'email', message: 'Email is already in use.' });
      }
    }

    // Add other field validations from 'submission_data' here

    if (errors.length > 0) {
      args.constraints[0] = errors;
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    if (args.constraints.length > 0) {
      return args.constraints[0].map((error: any) => `${error.field}: ${error.message}`).join(', ');
    } else {
      return 'Submission data is invalid';
    }
  }
}

export function IsSubmissionDataValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSubmissionDataValidConstraint,
    });
  };
}