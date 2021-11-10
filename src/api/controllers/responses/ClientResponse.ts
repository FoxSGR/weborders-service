import { IAddress, IClient } from '../../../types';

export abstract class ClientResponse implements Partial<IClient> {
  id: number;
  name: string;
  phoneNumber: string;
  vat: string;
  address: IAddress;
}
