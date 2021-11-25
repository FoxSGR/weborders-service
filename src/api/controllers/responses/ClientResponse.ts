import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Id } from '../../../types';
import { AddressResponse } from './AddressResponse';
import { AgentResponse } from './AgentResponse';

export abstract class ClientResponse {
  @IsInt()
  id: Id;
  @IsString()
  name: string;
  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  vat?: string;
  @ValidateNested()
  address: AddressResponse;
  @ValidateNested()
  agent?: AgentResponse;
}
