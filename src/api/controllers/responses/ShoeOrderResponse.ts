import {
  IsDate,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Id, ShoeSizes } from '../../../types';
import { ShoeSampleResponse } from './ShoeSampleResponse';

export class ShoeOrderResponse {
  @IsInt()
  id: Id;

  @IsOptional()
  @ValidateNested()
  sample: ShoeSampleResponse;

  @IsDate()
  dateAsked?: Date;

  @IsDate()
  dateDelivery?: Date;

  @IsOptional()
  @IsObject()
  sizes?: ShoeSizes;

  @IsString()
  notes: string;
}
