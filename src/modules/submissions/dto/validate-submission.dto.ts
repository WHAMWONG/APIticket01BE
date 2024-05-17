import { IsNotEmpty, IsEmail } from 'class-validator';

export class ValidateSubmissionDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @IsEmail({ message: 'Email format is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Submission data cannot be empty' })
  submissionData: string;
}