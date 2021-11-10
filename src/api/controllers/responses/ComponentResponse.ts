import { ComponentType, IComponent, Id } from '../../../types';
import { ColorResponse } from './ColorResponse';

export class ComponentResponse implements IComponent {
  id: Id;
  name: string;
  type: ComponentType;
  amount?: number;
  color?: ColorResponse;
}
