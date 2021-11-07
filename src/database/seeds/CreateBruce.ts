import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '../../api/models/User';

export class CreateBruce implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();

    const user = new User();
    user.firstName = 'Bruce';
    user.lastName = 'Wayne';
    user.email = 'bruce.wayne@wayne-enterprises.com';
    user.username = 'bruce';
    user.password = '1234';
    user.roles = ['admin'];
    await em.save(user);
  }
}
