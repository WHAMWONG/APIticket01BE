import { IsInt, IsNotEmpty } from 'class-validator';

export class VerifyMainMenuAccessDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;
}
import { IsBoolean, IsInt } from 'class-validator';

export class VerifyMainMenuAccessDto {
  @IsInt()
  user_id: number;

  @IsBoolean()
  is_logged_in: boolean;
}