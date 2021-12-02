import { Service } from 'typedi';
import { DeepPartial } from 'typeorm';

import { Mapper } from './Mapper';
import { IAgent, IUser } from '../../types';
import { ClientMapper } from './ClientMapper';
import { AddressMapper } from './AddressMapper';
import { AgentDTO } from '../controllers/dto/AgentDTO';

@Service()
export class AgentMapper extends Mapper<IAgent, AgentDTO> {
  constructor(
    private clientMapper: ClientMapper,
    private addressMapper: AddressMapper
  ) {
    super();
  }

  bodyToEntity(body: AgentDTO, user: IUser): DeepPartial<IAgent> {
    return {
      name: body.name,
      phoneNumber: body.phoneNumber,
      address: this.fieldToEntity(this.addressMapper, user, body.address),
    };
  }

  entityToResponse(agent: IAgent): AgentDTO {
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
