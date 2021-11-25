import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AddressBody } from './AddressBody';

export class AgentBody {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  phoneNumber?: string;

  @IsNotEmptyObject()
  @ValidateNested()
  address: AddressBody;
}
