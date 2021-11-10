import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Column } from 'typeorm';
import { Type } from 'class-transformer';

export class ColorBody {
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  @Type(() => Number)
  red: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  @Type(() => Number)
  green: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(255)
  @Type(() => Number)
  blue: number;
}
