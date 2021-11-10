import { IColor } from '../../../types';

export class ColorResponse implements IColor {
  id: number;
  name: string;
  red: number;
  green: number;
  blue: number;
}
