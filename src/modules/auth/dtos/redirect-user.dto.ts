import { IsNumber, IsString } from 'class-validator';

export class RedirectUserDto {
  @IsNumber({}, { message: 'User ID must be a number' })
  user_id: number;

  @IsString({ message: 'Selected option must be a string' })
  selected_option: string;
}