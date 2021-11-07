import { Mapper } from './Mapper';
import { IClient } from '../../types/IClient';
import { ClientResponse } from '../controllers/responses';

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
