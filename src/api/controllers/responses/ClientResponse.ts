import { IAddress, IClient, Id } from '../../../types';

export abstract class ClientResponse implements Partial<IClient> {
  id: Id;
  name: string;
  phoneNumber: string;
  vat: string;
  address: IAddress;
}
