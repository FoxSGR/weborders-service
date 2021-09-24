import { IEntity } from './IEntity';

export class Page<T extends IEntity> {
  total: number;
  offset: number;
  items: T[];
}
