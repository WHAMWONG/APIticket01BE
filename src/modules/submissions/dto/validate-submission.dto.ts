import { IsNotEmpty, IsEmail, Matches, IsString, MinLength, MaxLength } from 'class-validator';

const USERNAME_REGEX = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;
const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 20;

export class ValidateSubmissionDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(MIN_USERNAME_LENGTH, {
    message: `Username must be at least ${MIN_USERNAME_LENGTH} characters long`,
  })
  @MaxLength(MAX_USERNAME_LENGTH, {
    message: `Username must be at most ${MAX_USERNAME_LENGTH} characters long`,
  })
  @Matches(USERNAME_REGEX, {
    message: 'Username contains invalid characters',
  })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Submission data is required' })
  submissionData: string;
}