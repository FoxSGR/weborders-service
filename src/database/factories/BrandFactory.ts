import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Brand } from '../../api/models';

define(Brand, (faker: typeof Faker) => {
  const brand = new Brand();
  brand.name = faker.commerce.productName();
  brand.base = {
    owner: { id: 1 } as any,
  } as any;

  return brand;
});
