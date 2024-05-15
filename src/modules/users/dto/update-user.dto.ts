import { IsString, IsEmail, IsEnum, IsNumberString, IsNotEmpty, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export class UpdateUserDto {
  @IsNotEmpty({ message: "User not found or not logged in." })
  @IsNumberString()
  user_id: number;

  @IsNotEmpty({ message: "All fields are required." })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "All fields are required." })
  @IsEnum(Gender, { message: "Invalid gender." })
  gender: Gender;

  @IsNotEmpty({ message: "All fields are required." })
  @IsString()
  department: string;

  @IsNotEmpty({ message: "All fields are required." })
  @IsNumberString({ message: "Invalid employee number format." })
  employee_number: string;

  @IsNotEmpty({ message: "All fields are required." })
  @IsString()
  address: string;

  @IsNotEmpty({ message: "All fields are required." })
  @IsNumberString({ message: "Invalid phone number format." })
  phone_number: string;

  @IsNotEmpty({ message: "All fields are required." })
  @IsEmail({}, { message: "Invalid email format." })
  email: string;

  @IsNotEmpty({ message: "All fields are required." })
  @IsDate({ message: "Invalid date format." })
  @Type(() => Date)
  date_of_birth: Date;

  @IsNotEmpty({ message: "All fields are required." })
  @IsDate({ message: "Invalid date format." })
  @Type(() => Date)
  contract_date: Date;
}