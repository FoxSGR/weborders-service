import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class BrandBody {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;
}
