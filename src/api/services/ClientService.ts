import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Client } from '../models/Client';
import { ClientRepository } from '../repositories/ClientRepository';
import { EntityService } from './EntityService';

export class ClientService extends EntityService<Client> {
  constructor(
    @OrmRepository() repository: ClientRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface,
    protected service: ClientService
  ) {
    super(repository, eventDispatcher);
  }
}
