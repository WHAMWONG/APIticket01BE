import { IsString, IsEmail, IsEnum, IsNumberString, IsOptional, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsEnum(['male', 'female', 'other'])
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
  @Type(() => Date)
  date_of_birth: Date;

  @IsDate()
  @Type(() => Date)
  contract_date: Date;
}