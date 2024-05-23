import { IsNumber, IsNotEmpty } from 'class-validator';

export class ResetSearchCriteriaDto {
  @IsNumber({}, { message: 'user_id must be a number' })
  @IsNotEmpty({ message: 'user_id is required' })
  user_id: number;
}