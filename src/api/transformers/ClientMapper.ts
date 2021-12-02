import { Service } from 'typedi';

import { IClient, IUser, Promial } from '../../types';
import { Mapper } from './Mapper';
import { ClientDTO } from '../controllers/dto/ClientDTO';
import { AddressMapper } from './AddressMapper';
import { AgentMapper } from './AgentMapper';
import { AgentService } from '../services';

@Service()
export class ClientMapper extends Mapper<IClient, ClientDTO> {
  constructor(
    private addressMapper: AddressMapper,
    private agentService: AgentService
  ) {
    super();
  }

  async bodyToEntity(client: ClientDTO, user: IUser): Promial<IClient> {
    return {
      name: client.name,
      vat: client.vat,
      phoneNumber: client.phoneNumber,
      address: this.fieldToEntity(this.addressMapper, user, client.address),
      agent: await this.find(this.agentService, user, client.agent?.id),
    };
  }

  entityToResponse(client: IClient): ClientDTO {
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
