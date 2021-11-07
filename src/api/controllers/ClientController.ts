import { Authorized, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { IClient } from '../../types/IClient';
import { ClientService } from '../services/ClientService';
import { EntityController } from './base/EntityController';
import { ClientResponse } from './responses';
import { ClientBody } from './requests';
import { ClientMapper } from '../transformers/ClientMapper';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/client')
export class ClientController extends EntityController<
  IClient,
  ClientResponse,
  ClientBody
> {
  constructor(service: ClientService) {
    super();
    this.service = service;
    this.mapper = new ClientMapper();
  }
}
