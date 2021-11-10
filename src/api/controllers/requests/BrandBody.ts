import { IsNotEmpty, IsString } from 'class-validator';

export class BrandBody {
  @IsNotEmpty()
  @IsString()
  name: string;
}
