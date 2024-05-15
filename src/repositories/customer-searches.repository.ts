import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { CustomerSearch } from '@entities/customer_searches';

@Injectable()
export class CustomerSearchRepository extends BaseRepository<CustomerSearch> {}
