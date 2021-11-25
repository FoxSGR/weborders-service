import { Connection } from 'typeorm';
import { Factory, Seeder, times } from 'typeorm-seeding';

import { Client } from '../../api/models';

export class CreateClients implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();
    await times(10, async () => {
      const client = await factory(Client)().make();
      return em.save(client);
    });
  }
}
