import { Connection } from 'typeorm';
import { Factory, Seeder, times } from 'typeorm-seeding';

import { Component } from '../../api/models';

export class CreateComponents implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const em = connection.createEntityManager();
    await times(10, async () => {
      const component = await factory(Component)().make();
      return em.save(component);
    });
  }
}
