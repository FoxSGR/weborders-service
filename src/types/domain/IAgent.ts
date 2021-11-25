import { IEntity } from './IEntity';
import { IAddress } from './IAddress';
import { IClient } from './IClient';

export interface IAgent extends IEntity {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address?: IAddress;
  clients?: IClient[];
}
