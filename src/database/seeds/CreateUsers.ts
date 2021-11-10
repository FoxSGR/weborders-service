import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { User } from '../../api/models/User';

export class CreateUsers implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)().createMany(10);
  }
}
