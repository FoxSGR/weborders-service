import { IEntity } from './IEntity';
import { IShoeSample } from './IShoeSample';

export interface ShoeSizeData {
  amount: number;
}

export interface ShoeSizes {
  [size: number]: ShoeSizeData;
}

export interface IShoeOrder extends IEntity {
  sample: IShoeSample;
  dateAsked?: Date;
  dateDelivery?: Date;
  notes?: string;
  sizes?: ShoeSizes;
}
