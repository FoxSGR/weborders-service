import { Id, IShoeModel } from '../../../types';
import { ComponentResponse } from './ComponentResponse';

export class ShoeModelResponse implements IShoeModel {
  id: Id;
  reference: string;
  components: ComponentResponse[];
  dateAsked: Date;
  dateDelivery: Date;
  notes: string;
}
