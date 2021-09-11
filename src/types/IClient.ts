import { IAddress } from './IAddress';
import { IEntity } from './IEntity';

export interface IClient extends IEntity {
  id: number | string;
  name: string;
  phoneNumber: string;
  vat: string;
  address: IAddress;
}
