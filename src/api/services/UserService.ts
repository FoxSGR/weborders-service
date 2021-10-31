import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';
import { EntityService } from './EntityService';

@Service()
export class UserService extends EntityService<User> {
  constructor(
    @InjectRepository() repository: UserRepository,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super(repository, eventDispatcher);
  }

  async create(user: User): Promise<User> {
    const created = await super.create(user);
    if (created) {
      this.eventDispatcher.dispatch(events.user.created, created);
    }

    return created;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        username: username.toLocaleLowerCase(),
      },
    });
  }
}
