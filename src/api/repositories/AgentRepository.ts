import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Agent } from '../models';

@Service()
@EntityRepository(Agent)
export class AgentRepository extends Repository<Agent> {}
