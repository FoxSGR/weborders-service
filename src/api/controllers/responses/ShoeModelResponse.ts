import { Id, IShoeModel, ShoeModelType } from '../../../types';
import { ComponentResponse } from './ComponentResponse';

export class ShoeModelResponse implements IShoeModel {
  id: Id;
  type: ShoeModelType;
  reference: string;
  components: ComponentResponse[];
  dateAsked: Date;
  dateDelivery: Date;
  notes: string;
}
