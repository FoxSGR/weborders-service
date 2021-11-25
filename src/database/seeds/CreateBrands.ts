import { Connection } from 'typeorm';
import { Factory, Seeder, times } from 'typeorm-seeding';

import { Brand } from '../../api/models';

export class CreateBrands implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();
    await times(10, async () => {
      const client = await factory(Brand)().make();
      return em.save(client);
    });
  }
}
