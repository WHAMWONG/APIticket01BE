import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { RecordCustomerSelectionDto } from './dto/record-customer-selection.dto';
import { CustomerService } from './customer.service';

@Controller('/customer-information')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/select')
  @Auth()
  async recordSelection(@Body() recordCustomerSelectionDto: RecordCustomerSelectionDto) {
    const customer = await this.customerService.recordCustomerSelection(
      recordCustomerSelectionDto.customerId,
      recordCustomerSelectionDto.userId,
    );
    return {
      status: 200,
      customer: {
        id: customer.id,
        name: customer.name,
        katakana_name: customer.katakana_name,
        email: customer.email,
      },
    };
  }
}