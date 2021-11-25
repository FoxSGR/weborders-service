import { Service } from 'typedi';

import { IClient, IUser, Promial } from '../../types';
import { Mapper } from './Mapper';
import { ClientResponse } from '../controllers/responses/ClientResponse';
import { ClientBody } from '../controllers/requests/ClientBody';
import { AddressMapper } from './AddressMapper';
import { AgentMapper } from './AgentMapper';
import { AgentService } from '../services';

@Service()
export class ClientMapper extends Mapper<IClient, ClientResponse, ClientBody> {
  constructor(
    private addressMapper: AddressMapper,
    private agentService: AgentService
  ) {
    super();
  }

  async bodyToEntity(client: ClientBody, user: IUser): Promial<IClient> {
    return {
      name: client.name,
      vat: client.vat,
      phoneNumber: client.phoneNumber,
      address: this.fieldToEntity(this.addressMapper, user, client.address),
      agent: await this.find(this.agentService, user, client.agent),
    };
  }

  entityToResponse(client: IClient): ClientResponse {
    // no need to list the client's agents
    if (client.agent) {
      delete client.agent.clients;
    }

    const agentMapper = new AgentMapper(this, this.addressMapper); // cannot inject because they depend on each other
    return {
      id: client.id,
      address: this.fieldToResponse(this.addressMapper, client.address),
      name: client.name,
      phoneNumber: client.phoneNumber,
      vat: client.vat,
      agent: this.fieldToResponse(agentMapper, client.agent),
    };
  }
}
