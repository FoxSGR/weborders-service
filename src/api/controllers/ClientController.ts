import { getRepository } from 'typeorm';
import { Authorized, JsonController } from 'routing-controllers';

import { OpenAPI } from 'routing-controllers-openapi';
import { IClient } from '../../types';
import { EntityController } from './base/EntityController';
import { ClientResponse } from './responses/ClientResponse';
import { ClientBody } from './requests/ClientBody';
import { ClientMapper } from '../transformers/ClientMapper';
import { EntityService } from '../services/EntityService';
import { Client } from '../models/Client';
import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/client')
export class ClientController extends EntityController<
  IClient,
  ClientResponse,
  ClientBody
> {
  constructor(
    @EventDispatcher() protected eventDispatcher: EventDispatcherInterface
  ) {
    super();
    this.mapper = new ClientMapper();
    this.service = new EntityService(getRepository(Client), eventDispatcher);
  }
}
