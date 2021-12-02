import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IAddress } from '../../types';
import { AddressDTO } from '../controllers/dto/AddressDTO';

@Service()
export class AddressMapper extends Mapper<IAddress, AddressDTO> {
  bodyToEntity(body: AddressDTO): Partial<IAddress> {
    return {
      line1: body.line1,
      line2: body.line2,
      zipCode: body.zipCode,
      city: body.city,
      country: body.country,
    };
  }

  entityToResponse(input: IAddress): AddressDTO {
    return {
      line1: input.line1,
      line2: input.line2,
      zipCode: input.zipCode,
      city: input.city,
      country: input.country,
    };
  }
}
