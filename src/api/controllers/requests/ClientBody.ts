import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { AddressBody } from './AddressBody';

export class ClientBody {
  @IsNotEmpty()
  @Type(() => String)
  name?: string;

  @IsNotEmptyObject()
  @ValidateNested({ always: true })
  @Type(() => AddressBody)
  address: AddressBody;

  @IsOptional()
  @Type(() => String)
  phoneNumber: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  vat: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  agent?: number;
}
