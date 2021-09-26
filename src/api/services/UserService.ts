import { Service } from 'typedi';
import { User } from '../models/User';
import { events } from '../subscribers/events';
import { EntityService } from './EntityService';

@Service()
export class UserService extends EntityService<User> {

  async create(user: User): Promise<User> {
    const created = await super.create(user);
    if (created) {
      this.eventDispatcher.dispatch(events.user.created, created);
    }

    return created;
  }
}
