import * as Faker from 'faker';
import { Address } from '../../api/models/Address';
import { Client } from '../../api/models/Client';
import { define } from 'typeorm-seeding';

define(Client, (faker: typeof Faker) => {
  const client = new Client();
  client.name = faker.name.firstName();
  client.vat = faker.random.uuid();
  client.phoneNumber = faker.phone.phoneNumber();

  const address = new Address();
  address.city = faker.address.city();
  address.country = faker.address.countryCode();
  address.line1 = faker.address.streetAddress();
  address.zipCode = faker.address.zipCode();

  client.address = address;

  return client;
});
