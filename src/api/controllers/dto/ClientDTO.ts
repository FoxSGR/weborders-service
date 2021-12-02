import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Id } from '../../../types';
import { AddressDTO } from './AddressDTO';
import { AgentDTO } from './AgentDTO';

export abstract class ClientDTO {
  @IsOptional()
  id: Id;

  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  phoneNumber?: string;

  @IsOptional()
  @Type(() => String)
  vat?: string;

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => AgentDTO)
  agent?: AgentDTO;
}
