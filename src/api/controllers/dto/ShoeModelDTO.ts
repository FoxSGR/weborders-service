import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Id, SeasonType, seasonTypes, ShoeModelType } from '../../../types';
import { ComponentDTO } from './ComponentDTO';
import { ColorDTO } from './ColorDTO';

export class ShoeModelComponentDTO {
  @ValidateNested()
  @Type(() => ComponentDTO)
  component: ComponentDTO;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  amount?: number;

  @IsNumber()
  @IsOptional()
  @IsOptional()
  price?: number;

  @Type(() => ColorDTO)
  color?: ColorDTO;
}

export class SeasonDTO {
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

export class ShoeModelDTO {
  @IsOptional({ groups: ['create', 'update'] })
  id: Id;

  @IsString()
  @IsOptional()
  @Type(() => String)
  type: ShoeModelType;

  @IsString()
  @Type(() => String)
  @IsOptional({ groups: ['update'] })
  reference: string;

  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ShoeModelComponentDTO)
  components?: ShoeModelComponentDTO[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateCreated?: Date;

  @ValidateNested()
  @IsOptional({ groups: ['update'] })
  @Type(() => SeasonDTO)
  season: SeasonDTO;

  @IsOptional()
  @Type(() => String)
  notes?: string;
}
