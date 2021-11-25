import { IEntity } from './IEntity';
import { IShoeModel } from './IShoeModel';
import { IClient } from './IClient';
import { IBrand } from './IBrand';
import { IAgent } from './IAgent';

export interface IShoeSample extends IEntity {
  baseModel: IShoeModel;
  sampleModel: IShoeModel;
  client?: IClient;
  agent?: IAgent;
  brand?: IBrand;
  dateAsked?: Date;
  dateDelivery?: Date;
  notes?: string;
}
