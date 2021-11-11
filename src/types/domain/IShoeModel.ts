import { IEntity } from './IEntity';
import { IComponent } from './IComponent';

export const shoeModelTypes = ['base', 'sample', 'order'] as const;
export type ShoeModelType = typeof shoeModelTypes[number];

export interface IShoeModel extends IEntity {
  type: ShoeModelType;

  reference?: string;

  // TODO: photos

  // TODO: season --> primavera/verao ou outono/inverno e ano

  // TODO: move these to sample entity
  // brand?: IBrand;
  // client?: IClient;

  components: IComponent[];

  // TODO: box - just for order

  dateAsked?: Date;
  dateDelivery?: Date;

  notes?: string;
}
