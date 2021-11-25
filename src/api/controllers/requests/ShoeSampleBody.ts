import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ShoeModelBody } from './ShoeModelBody';

export class ShoeSampleBody {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  baseModel: number;

  @IsNotEmptyObject()
  @ValidateNested()
  sampleModel: ShoeModelBody;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  client?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  agent?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  brand?: number;

  @IsOptional()
  @Type(() => Date)
  dateAsked?: Date;

  @IsOptional()
  @Type(() => Date)
  dateDelivery?: Date;

  @IsOptional()
  notes?: string;
}
