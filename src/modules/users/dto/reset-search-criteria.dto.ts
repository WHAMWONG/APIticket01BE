import { IsNumber, IsNotEmpty } from 'class-validator';

export class ResetSearchCriteriaDto {
  @IsNumber({}, { message: 'userId must be a number' })
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;
}