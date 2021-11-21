import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Component } from '../../api/models';
import { componentTypes } from '../../types';

define(Component, (faker: typeof Faker) => {
  const component = new Component();
  component.name = faker.commerce.productName();
  component.type =
    componentTypes[faker.random.number(componentTypes.length - 1)];
  component.color = faker.random.boolean()
    ? ({
        id: faker.random.number(9),
      } as any)
    : undefined;
  component.amount = faker.random.boolean()
    ? faker.random.number(20)
    : undefined;
  component.base = {
    owner: { id: 1 } as any,
  } as any;
  return component;
});
