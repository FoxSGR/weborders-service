import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Column } from 'typeorm';
import { Type } from 'class-transformer';

export class ColorBody {
  @IsNotEmpty()
  @IsString()
  @Column()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(255)
  @Type(() => Number)
  red: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(255)
  @Type(() => Number)
  green: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(255)
  @Type(() => Number)
  blue: number;
}
