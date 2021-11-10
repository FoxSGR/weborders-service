import { Authorized, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { IClient } from '../../types';
import { EntityController } from './base/EntityController';
import { ClientResponse } from './responses/ClientResponse';
import { ClientBody } from './requests/ClientBody';
import { ClientMapper } from '../transformers/ClientMapper';
import { ClientService } from '../services';

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
    this.mapper = new ClientMapper();
    this.service = service;
  }
}
