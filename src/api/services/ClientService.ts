import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { ClientRepository } from '../repositories/ClientRepository';
import { EntityService } from './EntityService';
import { Client } from '../models';

@Service()
export class ClientService extends EntityService<Client> {
  constructor(
    @InjectRepository() repository: ClientRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher, { name: 'client' });
  }
}
