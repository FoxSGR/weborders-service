import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

import { Client } from '../models';

@Service()
@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}
