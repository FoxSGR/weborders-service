import { Client } from '../models/Client';
import { ClientRepository } from '../repositories/ClientRepository';
import { EntityService } from './EntityService';

export class ClientService extends EntityService<Client, ClientRepository> {}
