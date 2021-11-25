import { IsInt, IsString } from 'class-validator';
import { Id } from '../../../types';

export class ColorResponse {
  @IsInt()
  id: Id;
  @IsString()
  name: string;
  @IsInt()
  red: number;
  @IsInt()
  green: number;
  @IsInt()
  blue: number;
}
