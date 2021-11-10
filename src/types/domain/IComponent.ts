import { IEntity } from './IEntity';
import { IColor } from './IColor';

export const componentTypes = [
  'last',
  'heel',
  'sole',
  'productionInsole',
  'finishInsole',
  'backCounter',
  'laces',
  'frontlet',
  'lining',
  'zip',
  'leather',
  'ornament',
] as const;

export type ComponentType = typeof componentTypes[number];

export interface IComponent extends IEntity {
  type: ComponentType;
  name: string;
  amount?: number;
  color?: IColor;
}
