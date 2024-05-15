import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { StringField } from '@decorators/field.decorator';
import { IsPassword } from '@shared/validators/is-password.validator';
import { IsEqualTo } from '@shared/validators/is-equal-to.validator';

export class AuthRegistrationExampleAuthRequest {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @MaxLength(255, { message: 'Username must be at most 255 characters long' })
  username: string;

  @IsEmail({}, { message: 'Email format is invalid' })
  @MaxLength(255, { message: 'Email must be at most 255 characters long' })
  email: string;

  @IsPassword({ message: 'Password does not meet complexity requirements' })
  @MaxLength(255, { message: 'Password must be at most 255 characters long' })
  password: string;

  @IsEqualTo('password', { message: 'Password confirmation does not match password' })
  @MaxLength(255, { message: 'Password confirmation must be at most 255 characters long' })
  password_confirmation: string;
}

export class AuthRegistrationExampleAuthRequestDto {
  @StringField({ maxLength: 255, minLength: 0, password: true, message: 'Password does not meet complexity requirements' })
  password: string;

  @StringField({ maxLength: 255, minLength: 0, equalTo: 'password', message: 'Password confirmation does not match password' })
  password_confirmation: string;

  @StringField({ email: true, maxLength: 255, minLength: 0, message: 'Email format is invalid' })
  email: string;

  @StringField({ maxLength: 255, message: 'Username cannot be empty' })
  username: string;
}