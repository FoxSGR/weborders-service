import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IBrand } from '../../types';
import { BrandDTO } from '../controllers/dto/BrandDTO';

@Service()
export class BrandMapper extends Mapper<IBrand, BrandDTO> {
  bodyToEntity(body: BrandDTO): Partial<IBrand> {
    return {
      name: body.name,
    };
  }

  entityToResponse(brand: IBrand): BrandDTO {
    return {
      id: brand.id,
      name: brand.name,
    };
  }
}
