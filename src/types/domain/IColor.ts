import { IEntity } from './IEntity';

export interface IColor extends IEntity {
  name: string;
  red: number;
  green: number;
  blue: number;
}
