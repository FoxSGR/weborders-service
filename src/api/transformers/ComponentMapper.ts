import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IComponent } from '../../types';
import { ComponentResponse } from '../controllers/responses/ComponentResponse';
import { ComponentBody } from '../controllers/requests/ComponentBody';

@Service()
export class ComponentMapper extends Mapper<
  IComponent,
  ComponentResponse,
  ComponentBody
> {
  bodyToEntity(body: ComponentBody): Partial<IComponent> {
    return {
      name: body.name,
      type: body.type,
      amount: body.amount,
      price: body.price,
      notes: body.notes,
    };
  }

  entityToResponse(component: IComponent): ComponentResponse {
    return {
      id: component.id,
      name: component.name,
      type: component.type,
      amount: component.amount,
      price: component.price,
      notes: component.notes,
    };
  }
}
