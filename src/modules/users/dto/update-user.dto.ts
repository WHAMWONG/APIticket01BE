import { IsString, IsEmail, IsOptional, IsNumberString, IsDate } from 'class-validator';

export class UpdateUserDto {
  @IsNumberString()
  user_id: string;

  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsString()
  department: string;

  @IsNumberString()
  employee_number: string;

  @IsString()
  address: string;

  @IsNumberString()
  phone_number: string;

  @IsEmail()
  email: string;

  @IsDate()
  date_of_birth: Date;

  @IsDate()
  contract_date: Date;
}