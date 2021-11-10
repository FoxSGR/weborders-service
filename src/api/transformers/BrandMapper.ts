import { Mapper } from './Mapper';
import { IBrand } from '../../types';
import { BrandResponse } from '../controllers/responses/BrandResponse';

export class BrandMapper implements Mapper<IBrand, BrandResponse> {
  toResponse(brand: IBrand): BrandResponse {
    return {
      id: brand.id,
      name: brand.name,
    };
  }
}
