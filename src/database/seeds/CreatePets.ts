import { Connection } from 'typeorm';
import { Factory, Seeder, times } from 'typeorm-seeding';

import { User } from '../../api/models/User';

export class CreatePets implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();
    await times(10, async () => {
      const user = await factory(User)().make();
      return await em.save(user);
    });
  }
}
