import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { AddressUpdate } from '@entities/address_updates';

@Injectable()
export class AddressUpdateRepository extends BaseRepository<AddressUpdate> {}
