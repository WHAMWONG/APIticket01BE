import { IsNotEmpty, IsEmail, IsDateString, IsEnum, IsInt, Matches, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export class ValidateSubmissionFormDto {
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  @Matches(/^\d+$/, { message: 'Employee number must contain only digits' })
  employee_number: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Matches(/^\+?\d{10,15}$/, { message: 'Phone number must be a valid international phone number' })
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: string;

  @IsNotEmpty()
  @IsDateString()
  contract_date: string;
}