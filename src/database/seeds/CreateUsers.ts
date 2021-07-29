import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { User } from '../../../src/api/models/User';

export class CreateUsers implements Seeder {
    async run(factory: Factory, connection: Connection): Promise<void> {
        await factory(User)().seedMany(10);
    }
}
