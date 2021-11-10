import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { ShoeModelRepository } from '../repositories/ShoeModelRepository';
import { EntityService } from './EntityService';
import { ShoeModel } from '../models';

@Service()
export class ShoeModelService extends EntityService<ShoeModel> {
  constructor(
    @InjectRepository() repository: ShoeModelRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher, { name: 'shoe_model' });
  }
}
