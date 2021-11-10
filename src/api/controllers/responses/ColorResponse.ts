import { IColor, Id } from '../../../types';

export class ColorResponse implements IColor {
  id: Id;
  name: string;
  red: number;
  green: number;
  blue: number;
}
