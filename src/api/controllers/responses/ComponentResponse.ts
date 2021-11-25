import { IsInt, IsOptional, IsString } from 'class-validator';

import { ComponentType, Id } from '../../../types';

export class ComponentResponse {
  @IsInt()
  id: Id;
  @IsString()
  name: string;
  @IsString()
  type: ComponentType;
  @IsOptional()
  amount?: number;
  @IsOptional()
  price?: number;
  @IsString()
  notes?: string;
}
