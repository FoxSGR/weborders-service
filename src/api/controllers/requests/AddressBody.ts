import { IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

import { IAddress } from '../../../types';
import { countries } from '../../models/countries';

export class AddressBody implements Partial<IAddress> {
  @IsOptional()
  @Type(() => String)
  line1: string;

  @IsOptional()
  @Type(() => String)
  line2: string;

  @IsOptional()
  @Type(() => String)
  city: string;

  @ValidateIf((country: string) => (country ? !!countries[country] : true))
  @Type(() => String)
  country: string;

  @IsOptional()
  @Type(() => String)
  zipCode: string;
}
