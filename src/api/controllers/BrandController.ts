import { Authorized, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { IBrand } from '../../types';
import { BrandResponse } from './responses/BrandResponse';
import { BrandBody } from './requests/BrandBody';
import { BrandMapper } from '../transformers/BrandMapper';
import { BrandService } from '../services/BrandService';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/brand')
export class BrandController extends EntityController<
  IBrand,
  BrandResponse,
  BrandBody
> {
  constructor(service: BrandService) {
    super();
    this.mapper = new BrandMapper();
    this.service = service;
  }
}
