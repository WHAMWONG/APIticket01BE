import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { CustomerInformation } from '@entities/customer_informations';

@Injectable()
export class CustomerInformationRepository extends BaseRepository<CustomerInformation> {}
