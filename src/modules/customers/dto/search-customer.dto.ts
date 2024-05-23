import { IsEnum, IsInt, IsString } from 'class-validator';

export class SearchCustomerDto {
  @IsString()
  searchCriteria: string;

  @IsEnum(['name', 'katakana_name', 'email'])
  searchType: 'name' | 'katakana_name' | 'email';

  @IsInt()
  userId: number;
}