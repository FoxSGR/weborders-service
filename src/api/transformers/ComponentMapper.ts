import { Mapper } from './Mapper';
import { IComponent } from '../../types';
import { ComponentResponse } from '../controllers/responses/ComponentResponse';
import { ColorMapper } from './ColorMapper';

export class ComponentMapper implements Mapper<IComponent, ComponentResponse> {
  toResponse(component: IComponent): ComponentResponse {
    const colorMapper = new ColorMapper();
    return {
      id: component.id,
      name: component.name,
      type: component.type,
      amount: component.amount,
      color: component.color
        ? colorMapper.toResponse(component.color)
        : undefined,
    };
  }
}
