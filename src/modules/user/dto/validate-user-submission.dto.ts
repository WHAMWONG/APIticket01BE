import { IsNotEmpty, IsEmail, IsJSON, ValidateNested, Length, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class ValidateUserSubmissionDto {
  @IsNotEmpty({ message: 'Username cannot be empty and must be between 3 and 20 characters.' })
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username must contain only alphanumeric characters and underscores.',
  })
  username: string;

  @IsNotEmpty({ message: 'Email cannot be empty and must be a valid email format.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Submission data is invalid or missing required fields.' })
  @IsJSON({ message: 'Submission data must be a valid JSON object.' })
  @ValidateNested()
  @Type(() => Object)
  submissionData: any;
}