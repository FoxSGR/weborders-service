import * as Faker from 'faker';
import { Address, Agent } from '../../api/models';
import { define } from 'typeorm-seeding';

define(Agent, (faker: typeof Faker) => {
  const agent = new Agent();
  agent.name = faker.name.firstName() + ' ' + faker.name.lastName();
  agent.vat = faker.random.uuid();
  agent.phoneNumber = faker.phone.phoneNumber();

  const address = new Address();
  address.city = faker.address.city();
  address.country = faker.address.countryCode();
  address.line1 = faker.address.streetAddress();
  address.zipCode = faker.address.zipCode();

  agent.address = address;

  agent.base = {
    owner: { id: 1 } as any,
  } as any;

  return agent;
});
