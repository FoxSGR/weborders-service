import { Id } from '../../../types';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ShoeModelBody {
  @IsOptional()
  @IsNotEmpty()
  reference?: string;

  @IsOptional()
  @IsNumber()
  components: Id[];

  @IsOptional()
  @IsDate()
  dateAsked?: Date;

  @IsOptional()
  @IsDate()
  dateDelivery?: Date;

  @IsOptional()
  @IsNotEmpty()
  notes?: string;
}
