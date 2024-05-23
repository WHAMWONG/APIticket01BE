import { IsNumber, IsNotEmpty } from 'class-validator';

export class RecordCustomerSelectionDto {
  @IsNumber({}, { message: 'customerId must be a number' })
  @IsNotEmpty({ message: 'customerId is required' })
  customerId: number;

  @IsNumber({}, { message: 'userId must be a number' })
  @IsNotEmpty({ message: 'userId is required' })
  userId: number;
}