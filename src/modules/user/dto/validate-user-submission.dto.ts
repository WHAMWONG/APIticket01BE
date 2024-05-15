import { IsNotEmpty, IsEmail, IsJSON, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ValidateUserSubmissionDto {
  @IsNotEmpty({ message: 'Username should not be empty.' })
  username: string;

  @IsNotEmpty({ message: 'Email should not be empty.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'Submission data should not be empty.' })
  @IsJSON({ message: 'Submission data must be a valid JSON object.' })
  @ValidateNested()
  @Type(() => Object)
  submissionData: any;
}