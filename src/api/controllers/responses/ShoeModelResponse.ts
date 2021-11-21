import { Id, ShoeModelType } from '../../../types';
import { ComponentResponse } from './ComponentResponse';

export class ShoeModelResponse {
  id: Id;
  type: ShoeModelType;
  reference: string;
  components?: ComponentResponse[];
  dateCreated: Date;
  notes: string;
}
