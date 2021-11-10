import { IEntity } from './IEntity';
import { IClient } from './IClient';
import { IBrand } from './IBrand';
import { IComponent } from './IComponent';

export interface IShoeModel extends IEntity {
  reference?: string;

  // TODO: photos
  // TODO: season

  brand?: IBrand;
  client?: IClient;

  components: IComponent[];

  // TODO: box
  // TODO: sheet number

  dateAsked?: Date;
  dateDelivery?: Date;

  notes?: string;
}
