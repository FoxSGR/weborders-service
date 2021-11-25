import { IAddress } from './IAddress';
import { IEntity } from './IEntity';
import { IAgent } from './IAgent';

export interface IClient extends IEntity {
  name: string;
  phoneNumber?: string;
  vat?: string;
  address: IAddress;
  agent?: IAgent;
  notes?: string;
}
