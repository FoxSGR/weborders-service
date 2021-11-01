import { Authorized, JsonController } from 'routing-controllers';
import { IClient } from '../../types/IClient';
import { ClientService } from '../services/ClientService';
import { EntityController } from './base/EntityController';
import { ClientResponse } from './responses';
import { OpenAPI } from 'routing-controllers-openapi';
import { ClientBody } from './requests';

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
  }

  toResponse(client: IClient): ClientResponse {
    return {
      id: client.id,
      address: client.address,
      name: client.name,
      phoneNumber: client.phoneNumber,
      vat: client.vat,
      ...this.transformBase(client['base']),
    };
  }
}
