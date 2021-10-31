import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IClient } from '../../../types/IClient';
import { IAddress } from '../../../types/IAddress';
import { DeepPartial } from 'typeorm';
import { countries } from '../../models/countries';

export class AddressBody implements Partial<IAddress> {
  @IsOptional()
  line1: string;
  @IsOptional()
  line2: string;
  @IsOptional()
  city: string;
  @IsOptional()
  @Validate((country: string) => (country ? !!countries[country] : true))
  country: string;
  @IsOptional()
  zipCode: string;
}

export class ClientBody implements DeepPartial<IClient> {
  @IsNotEmpty()
  name?: string;

  @ValidateNested()
  address: AddressBody;

  @MinLength(7)
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  vat: string;
}
