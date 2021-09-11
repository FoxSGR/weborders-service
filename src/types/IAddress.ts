import { IEntity } from './IEntity';

export interface IAddress extends IEntity {
  id: number;
  line1: string;
  line2: string;
  city: string;
  zipCode: string;
  country: string;
}
