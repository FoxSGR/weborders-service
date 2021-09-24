import { IAddress } from '../../../types/IAddress';
import { IClient } from '../../../types/IClient';

export abstract class ClientResponse implements IClient {
  id: number | string;
  name: string;
  phoneNumber: string;
  vat: string;
  address: IAddress;
}
