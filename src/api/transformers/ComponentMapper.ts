import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IComponent } from '../../types';
import { ComponentDTO } from '../controllers/dto/ComponentDTO';

@Service()
export class ComponentMapper extends Mapper<IComponent, ComponentDTO> {
  bodyToEntity(body: ComponentDTO): Partial<IComponent> {
    return {
      name: body.name,
      type: body.type,
      amount: body.amount,
      price: body.price,
      notes: body.notes,
    };
  }

  entityToResponse(component: IComponent): ComponentDTO {
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
