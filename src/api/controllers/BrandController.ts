import { getRepository } from 'typeorm';
import { Authorized, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { IBrand } from '../../types';
import { BrandResponse } from './responses/BrandResponse';
import { BrandBody } from './requests/BrandBody';
import { BrandMapper } from '../transformers/BrandMapper';
import { EntityService } from '../services/EntityService';
import { Brand } from '../models/Brand';
import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/brand')
export class BrandController extends EntityController<
  IBrand,
  BrandResponse,
  BrandBody
> {
  constructor(@EventDispatcher() eventDispatcher: EventDispatcherInterface) {
    super();
    this.mapper = new BrandMapper();
    this.service = new EntityService(getRepository(Brand), eventDispatcher);
  }
}
