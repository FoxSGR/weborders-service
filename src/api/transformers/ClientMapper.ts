import { Mapper } from './Mapper';
import { IClient } from '../../types';
import { ClientResponse } from '../controllers/responses/ClientResponse';

export class ClientMapper implements Mapper<IClient, ClientResponse> {
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
