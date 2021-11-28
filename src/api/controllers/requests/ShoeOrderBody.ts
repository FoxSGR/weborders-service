import { IsDate, IsInt, IsObject, IsOptional, IsString } from 'class-validator';
import { ShoeSizes } from '../../../types';

export class ShoeOrderBody {
  @IsInt()
  sample: number;

  @IsOptional()
  @IsDate()
  dateAsked?: Date;

  @IsOptional()
  @IsDate()
  dateDelivery?: Date;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsObject()
  sizes?: ShoeSizes;
}
