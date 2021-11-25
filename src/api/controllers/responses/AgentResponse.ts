import { IsInt, IsString, ValidateNested } from 'class-validator';

import { Id } from '../../../types';
import { ClientResponse } from './ClientResponse';
import { AddressResponse } from './AddressResponse';

export class AgentResponse {
  @IsInt()
  id: Id;
  @IsString()
  name: string;
  @ValidateNested({ each: true })
  clients: ClientResponse[];
  @ValidateNested()
  address: AddressResponse;
}
