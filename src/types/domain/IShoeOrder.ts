import { IEntity } from './IEntity';
import { IShoeSample } from './IShoeSample';
import { IShoeModel } from './IShoeModel';

export interface ShoeSizeData {
  amount: number;
}

export interface ShoeSizes {
  [size: number]: ShoeSizeData;
}

export interface IShoeOrder extends IEntity {
  sample: IShoeSample;
  model: IShoeModel;
  dateAsked?: Date;
  dateDelivery?: Date;
  notes?: string;
  sizes?: ShoeSizes;
}
