import { IsNotEmpty, IsEmail } from 'class-validator';

export class ValidateSubmissionDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  submissionData: string;
}