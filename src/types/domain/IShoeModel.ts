import { IEntity } from './IEntity';
import { IClient } from './IClient';

export interface IShoeModel extends IEntity {
  reference: string;
  brand: string;

  client: IClient;
}
