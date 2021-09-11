import { IEntity } from './IEntity';

export class Page<T extends IEntity> {
  total: number;
  index: number;
  items: T[];
}
