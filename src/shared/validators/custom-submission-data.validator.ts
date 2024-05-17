import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsSubmissionDataValidConstraint implements ValidatorConstraintInterface {
  validate(submissionData: any, args: ValidationArguments) {
    let errors = [];
    const isValidUsername = typeof submissionData.username === 'string' && submissionData.username.trim() !== '';
    const isValidEmail = typeof submissionData.email === 'string' && submissionData.email.includes('@');

    if (!isValidUsername) {
      errors.push({ field: 'username', message: 'Username cannot be empty' });
    }
    if (!isValidEmail) {
      errors.push({ field: 'email', message: 'Email format is invalid' });
    }

    return { isValid: isValidUsername && isValidEmail, errors: errors };
  }

  defaultMessage(args: ValidationArguments) {
    if (args.constraints[0]) {
      return args.constraints[0];
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
      validator: IsSubmissionDataValidConstraint
    });
  };
}