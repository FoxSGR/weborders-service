import { IEntity } from './IEntity';
import { IShoeModelComponent } from './IShoeModelComponent';
import { ISeason } from './ISeason';
import { IPhoto } from './IPhoto';

export const shoeModelTypes = ['base', 'sample', 'order'] as const;
export type ShoeModelType = typeof shoeModelTypes[number];

export interface IShoeModel extends IEntity {
  type: ShoeModelType;

  reference?: string;

  photos: IPhoto[];

  components: IShoeModelComponent[];

  dateCreated?: Date;

  season: ISeason;

  notes?: string;
}
