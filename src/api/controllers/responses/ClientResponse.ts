import { IAddress } from 'src/types/IAddress';
import { IClient } from 'src/types/IClient';

export abstract class ClientResponse implements IClient {
  id: number | string;
  name: string;
  phoneNumber: string;
  vat: string;
  address: IAddress;
}
