import {
  IsDate,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Id, ShoeSizes } from '../../../types';
import { ShoeSampleDTO } from './ShoeSampleDTO';

export class ShoeOrderDTO {
  @IsOptional()
  id: Id;

  @ValidateNested()
  @IsOptional()
  @Type(() => ShoeSampleDTO)
  sample: ShoeSampleDTO;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateAsked?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateDelivery?: Date;

  @IsObject()
  @IsOptional()
  sizes?: ShoeSizes;

  @IsString()
  @IsOptional()
  @Type(() => String)
  notes: string;
}
