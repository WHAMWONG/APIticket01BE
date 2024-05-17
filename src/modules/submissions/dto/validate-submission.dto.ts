import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches, IsJSON, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SubmissionData {
  // Add required fields with their respective validation rules here
  // Example:
  // @IsString()
  // @MinLength(2)
  // @MaxLength(50)
  // fieldName: string;
}

export class ValidateSubmissionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'username must contain only alphanumeric characters and underscores',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  // Unique email validation is not handled here, it should be done in the service layer
  email: string;

  @IsNotEmpty()
  @IsJSON()
  @ValidateNested()
  @Type(() => SubmissionData)
  // Add custom validation to ensure 'submissionData' contains all required fields
  // This can be done by creating a class for 'submissionData' and using the @ValidateNested() decorator
  submissionData: string;
}