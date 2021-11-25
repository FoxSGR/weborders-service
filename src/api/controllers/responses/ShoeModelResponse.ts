import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Id, ISeason, ShoeModelType } from '../../../types';
import { ComponentResponse } from './ComponentResponse';
import { ColorResponse } from './ColorResponse';

export class ShoeModelComponentResponse {
  component: ComponentResponse;
  @IsOptional()
  amount?: number;
  @IsOptional()
  price?: number;
  @IsOptional()
  color?: ColorResponse;
}

export class ShoeModelResponse {
  @IsInt()
  id: Id;
  @IsString()
  type: ShoeModelType;
  @IsString()
  reference: string;
  @ValidateNested({ each: true })
  components?: ShoeModelComponentResponse[];
  @IsOptional()
  dateCreated?: Date;
  @ValidateNested({ each: true })
  seasons: ISeason;
  @IsOptional()
  notes?: string;
}
