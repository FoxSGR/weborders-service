import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { ShoeSampleRepository } from '../repositories/ShoeSampleRepository';
import { EntityService } from './EntityService';
import { ShoeSample } from '../models';
import { IUser } from '../../types';

@Service()
export class ShoeSampleService extends EntityService<ShoeSample> {
  constructor(
    @InjectRepository() repository: ShoeSampleRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher, {
      name: 'shoe_sample',
      relations: ['baseModel', 'sampleModel', 'client', 'agent', 'brand'],
    });
  }

  async create(entity: Partial<ShoeSample>, user: IUser): Promise<ShoeSample> {
    entity.sampleModel.type = 'sample';
    return super.create(entity, user);
  }
}
