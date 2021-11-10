import { Id, IShoeModel } from '../../../types';
import { BrandResponse } from './BrandResponse';
import { ClientResponse } from './ClientResponse';
import { ComponentResponse } from './ComponentResponse';

export class ShoeModelResponse implements IShoeModel {
  id: Id;
  reference: string;
  brand?: BrandResponse;
  client?: ClientResponse;
  components: ComponentResponse[];
  dateAsked: Date;
  dateDelivery: Date;
  notes: string;
}
