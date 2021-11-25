import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ComponentType, componentTypes } from '../../../types';

export class ComponentBody {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => String)
  @Validate((type) => componentTypes.includes(type))
  type: ComponentType;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
