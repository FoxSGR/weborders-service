import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Id } from '../../../types';
import { ClientDTO } from './ClientDTO';

export class AgentDTO {
  @IsOptional()
  id: Id;

  @IsString()
  @IsNotEmpty()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  name: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  phoneNumber?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional({ groups: ['update'] })
  clients: ClientDTO[];

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  address: AgentDTO;
}
