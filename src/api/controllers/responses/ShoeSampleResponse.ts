import { IsInt, IsOptional, ValidateNested } from 'class-validator';

import { ShoeModelResponse } from './ShoeModelResponse';
import { ClientResponse } from './ClientResponse';
import { AgentResponse } from './AgentResponse';
import { BrandResponse } from './BrandResponse';

export class ShoeSampleResponse {
  @IsInt()
  id: number;
  @ValidateNested()
  baseModel: ShoeModelResponse;
  @ValidateNested()
  sampleModel: ShoeModelResponse;
  @ValidateNested()
  client?: ClientResponse;
  @ValidateNested()
  agent?: AgentResponse;
  @ValidateNested()
  brand?: BrandResponse;
  @IsOptional()
  dateAsked?: Date;
  @IsOptional()
  dateDelivery?: Date;
  @IsOptional()
  notes?: string;
}
