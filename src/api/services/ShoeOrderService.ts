import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { EntityService } from './EntityService';
import { ShoeOrder } from '../models/ShoeOrder';
import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { ShoeOrderRepository } from '../repositories/ShoeOrderRepository';

@Service()
export class ShoeOrderService extends EntityService<ShoeOrder> {
  constructor(
    @InjectRepository() repository: ShoeOrderRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher, {
      name: 'shoe_order',
      relations: ['sample'],
    });
  }
}
