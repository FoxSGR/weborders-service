import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Color } from '../../api/models/Color';

define(Color, (faker: typeof Faker) => {
  const color = new Color();
  color.name = faker.commerce.color();
  color.red = faker.random.number(255);
  color.green = faker.random.number(255);
  color.blue = faker.random.number(255);
  color.base = {
    owner: { id: 1 } as any,
  } as any;

  return color;
});
