import { IAddress } from './IAddress';
import { IEntity } from './IEntity';

export interface IClient extends IEntity {
  name: string;
  phoneNumber: string;
  vat: string;
  address: IAddress;
}
