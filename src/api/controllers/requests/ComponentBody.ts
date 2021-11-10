import { IsNotEmpty, IsNumber, IsString, Min, Validate } from 'class-validator';
import { ComponentType, componentTypes } from '../../../types';

export class ComponentBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Validate((type) => componentTypes.includes(type))
  type: ComponentType;

  @IsNumber()
  @Min(0)
  amount?: number;

  @IsNumber()
  @Min(0)
  color?: number;
}
