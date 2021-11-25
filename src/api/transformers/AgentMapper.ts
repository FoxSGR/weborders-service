import { Service } from 'typedi';
import { DeepPartial } from 'typeorm';

import { Mapper } from './Mapper';
import { IAgent, IUser } from '../../types';
import { AgentResponse } from '../controllers/responses/AgentResponse';
import { AgentBody } from '../controllers/requests/AgentBody';
import { ClientMapper } from './ClientMapper';
import { AddressMapper } from './AddressMapper';

@Service()
export class AgentMapper extends Mapper<IAgent, AgentResponse, AgentBody> {
  constructor(
    private clientMapper: ClientMapper,
    private addressMapper: AddressMapper
  ) {
    super();
  }

  bodyToEntity(body: AgentBody, user: IUser): DeepPartial<IAgent> {
    return {
      name: body.name,
      phoneNumber: body.phoneNumber,
      address: this.fieldToEntity(this.addressMapper, user, body.address),
    };
  }

  entityToResponse(agent: IAgent): AgentResponse {
    // prevent overflow
    agent.clients?.forEach((client) => delete client.agent);

    return {
      id: agent.id,
      name: agent.name,
      clients: this.fieldToResponse(this.clientMapper, agent.clients),
      address: this.fieldToResponse(this.addressMapper, agent.address),
    };
  }
}
