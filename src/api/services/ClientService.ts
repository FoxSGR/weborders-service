import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { Client } from '../models/Client';
import { ClientRepository } from '../repositories/ClientRepository';
import { EntityService } from './EntityService';

@Service()
export class ClientService extends EntityService<Client> {
  constructor(
    @InjectRepository() repository: ClientRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher);
  }
}
