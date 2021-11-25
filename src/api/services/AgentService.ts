import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { AgentRepository } from '../repositories/AgentRepository';
import { EntityService } from './EntityService';
import { ClientService } from './ClientService';
import { Agent } from '../models';
import { FindParams } from '../../types';

@Service()
export class AgentService extends EntityService<Agent> {
  constructor(
    @InjectRepository() repository: AgentRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface,
    private clientService: ClientService
  ) {
    super(repository, eventDispatcher, {
      name: 'agent',
      relations: ['address'],
    });
  }

  protected async setupFoundEntities(
    agents: Agent[],
    params: FindParams<Agent>
  ): Promise<void> {
    await super.setupFoundEntities(agents, params);

    if (params.loadRelations) {
      // find their clients
      const clients = await this.clientService.findAll({
        owner: params.owner,
        filter: { agentId: agents.map((a) => a.id) },
        loadRelations: true
      });

      for (const agent of agents) {
        agent.clients = clients.filter(
          (c) => c.agent && c.agent.id === agent.id
        );
      }
    }
  }
}
