import { IsInt, IsIn } from 'class-validator';

export class RedirectUserDto {
  @IsInt()
  user_id: number;

  @IsIn(['New Customer', 'Search Contracts', 'Update Customer Attributes', 'Address Update'])
  selected_option: string;
}