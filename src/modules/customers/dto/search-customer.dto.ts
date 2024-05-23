import { IsEnum, IsNotEmpty, IsInt, IsString } from 'class-validator';

export enum SearchType {
  NAME = 'name',
  KATAKANA_NAME = 'katakana_name',
  EMAIL = 'email',
}

export class SearchCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Search criteria is required.' })
  searchCriteria: string;

  @IsEnum(SearchType, { message: "Invalid search type. Must be 'name', 'katakana_name', or 'email'." })
  searchType: SearchType;

  @IsInt()
  userId: number;
}