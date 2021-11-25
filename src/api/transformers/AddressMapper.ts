import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IAddress } from '../../types';
import { AddressResponse } from '../controllers/responses/AddressResponse';
import { AddressBody } from '../controllers/requests/AddressBody';

@Service()
export class AddressMapper extends Mapper<
  IAddress,
  AddressResponse,
  AddressBody
> {
  bodyToEntity(body: AddressBody): Partial<IAddress> {
    return {
      line1: body.line1,
      line2: body.line2,
      zipCode: body.zipCode,
      city: body.city,
      country: body.country,
    };
  }

  entityToResponse(input: IAddress): AddressResponse {
    return {
      line1: input.line1,
      line2: input.line2,
      zipCode: input.zipCode,
      city: input.city,
      country: input.country,
    };
  }
}
