import { ComponentType, IComponent } from '../../../types';
import { ColorResponse } from './ColorResponse';

export class ComponentResponse implements IComponent {
  id: number;
  name: string;
  type: ComponentType;
  amount?: number;
  color?: ColorResponse;
}
