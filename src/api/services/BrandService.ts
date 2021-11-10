import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { BrandRepository } from '../repositories/BrandRepository';
import { EntityService } from './EntityService';
import { Brand } from '../models';

@Service()
export class BrandService extends EntityService<Brand> {
  constructor(
    @InjectRepository() repository: BrandRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher, { name: 'brand' });
  }
}
