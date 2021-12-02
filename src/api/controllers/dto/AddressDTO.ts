import { IsOptional } from 'class-validator';

export class AddressDTO {
  @IsOptional()
  line1: string;
  @IsOptional()
  line2: string;
  @IsOptional()
  zipCode: string;
  @IsOptional()
  city: string;
  @IsOptional()
  country: string;
}
