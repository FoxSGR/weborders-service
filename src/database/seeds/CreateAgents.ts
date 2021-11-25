import { Connection } from 'typeorm';
import { Factory, Seeder, times } from 'typeorm-seeding';

import { Agent } from '../../api/models';

export class CreateAgents implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();
    await times(10, async () => {
      const client = await factory(Agent)().make();
      return em.save(client);
    });
  }
}
