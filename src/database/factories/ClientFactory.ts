import * as Faker from 'faker';
import { Address, Client } from '../../api/models';
import { define } from 'typeorm-seeding';

define(Client, (faker: typeof Faker) => {
  const client = new Client();
  client.name = faker.name.firstName() + ' ' + faker.name.lastName();
  client.vat = faker.random.uuid();
  client.phoneNumber = faker.phone.phoneNumber();

  const address = new Address();
  address.city = faker.address.city();
  address.country = faker.address.countryCode();
  address.line1 = faker.address.streetAddress();
  address.zipCode = faker.address.zipCode();

  client.address = address;

  client.base = {
    owner: { id: 1 } as any,
  } as any;

  return client;
});
