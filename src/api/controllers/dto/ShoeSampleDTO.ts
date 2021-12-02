import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Id } from '../../../types';
import { ShoeModelDTO } from './ShoeModelDTO';
import { ClientDTO } from './ClientDTO';
import { AgentDTO } from './AgentDTO';
import { BrandDTO } from './BrandDTO';

export class ShoeSampleDTO {
  @IsOptional()
  id: Id;

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => ShoeModelDTO)
  baseModel: ShoeModelDTO;

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => ShoeModelDTO)
  sampleModel: ShoeModelDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => ClientDTO)
  client?: ClientDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => AgentDTO)
  agent?: AgentDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => BrandDTO)
  brand?: BrandDTO;

  @IsOptional()
  @Type(() => Date)
  dateAsked?: Date;

  @IsOptional()
  @Type(() => Date)
  dateDelivery?: Date;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
