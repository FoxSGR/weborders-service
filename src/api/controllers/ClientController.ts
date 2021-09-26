import { JsonController } from 'routing-controllers';
import { IClient } from '../../types/IClient';
import { ClientService } from '../services/ClientService';
import { EntityController } from './EntityController';
import { ClientResponse } from './responses';

@JsonController('/client')
export class ClientController extends EntityController<IClient, ClientResponse> {
  constructor(service: ClientService) {
    super(service);
  }

  toResponse(client: IClient): ClientResponse {
    return {
      id: client.id,
      address: client.address,
      name: client.name,
      phoneNumber: client.phoneNumber,
      vat: client.vat,
    };
  }
}
