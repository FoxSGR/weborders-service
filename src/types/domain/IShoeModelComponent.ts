import { IShoeModel } from './IShoeModel';
import { IComponent } from './IComponent';
import { IColor } from './IColor';

export interface IShoeModelComponent {
  model?: IShoeModel;
  component: IComponent;
  amount?: number;
  price?: number;
  color?: IColor;
}
