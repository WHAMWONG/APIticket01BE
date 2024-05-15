import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsSubmissionDataValidConstraint implements ValidatorConstraintInterface {
  validate(submissionData: any, args: ValidationArguments) {
    // Implement the "Validate User Information Submission" business logic here
    // For example, check if the submissionData contains a valid "username" and "email"
    // This is a placeholder for the actual validation logic
    const isValidUsername = typeof submissionData.username === 'string' && submissionData.username.trim() !== '';
    const isValidEmail = typeof submissionData.email === 'string' && submissionData.email.includes('@');
    return isValidUsername && isValidEmail;
  }

  defaultMessage(args: ValidationArguments) {
    // Provide a default error message
    return 'Submission data is invalid';
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