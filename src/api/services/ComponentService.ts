import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { EntityService } from './EntityService';
import { Component } from '../models';

@Service()
export class ComponentService extends EntityService<Component> {
  constructor(
    @InjectRepository() repository: ComponentRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher, { name: 'component' });
  }
}
