import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IBrand } from '../../types';
import { BrandResponse } from '../controllers/responses/BrandResponse';
import { BrandBody } from '../controllers/requests/BrandBody';

@Service()
export class BrandMapper extends Mapper<IBrand, BrandResponse, BrandBody> {
  bodyToEntity(body: BrandBody): Partial<IBrand> {
    return {
      name: body.name,
    };
  }

  entityToResponse(brand: IBrand): BrandResponse {
    return {
      id: brand.id,
      name: brand.name,
    };
  }
}
