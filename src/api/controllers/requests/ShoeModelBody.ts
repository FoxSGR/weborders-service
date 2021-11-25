import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Id, SeasonType, seasonTypes } from '../../../types';

export class ShoeModelComponentBody {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  component: Id;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  amount?: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  color?: number;
}

export class SeasonBody {
  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Type(() => Number)
  year: number;

  @IsNotEmpty()
  @Validate((season) => !!seasonTypes[season])
  @Type(() => String)
  seasons: SeasonType;
}

export class ShoeModelBody {
  @IsNotEmpty()
  @Type(() => String)
  reference: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  components: ShoeModelComponentBody[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateCreated?: Date;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SeasonBody)
  season: SeasonBody;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
