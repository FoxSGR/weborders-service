import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class BrandBody {
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;
}
