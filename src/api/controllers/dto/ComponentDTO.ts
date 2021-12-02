import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ComponentType, componentTypes, Id } from '../../../types';

export class ComponentDTO {
  @IsOptional()
  id: Id;

  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate((type) => componentTypes.includes(type))
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  type: ComponentType;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  notes?: string;
}
