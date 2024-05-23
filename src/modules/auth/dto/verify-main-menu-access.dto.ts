import { IsBoolean, IsInt } from 'class-validator';

export class VerifyMainMenuAccessDto {
  @IsInt()
  user_id: number;

  @IsBoolean()
  is_logged_in: boolean;
}