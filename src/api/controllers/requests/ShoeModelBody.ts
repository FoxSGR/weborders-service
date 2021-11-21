import { Id } from '../../../types';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  Validate,
} from 'class-validator';

export class ShoeModelBody {
  @IsOptional()
  @IsNotEmpty()
  reference?: string;

  @IsNotEmpty()
  @Validate((id) => typeof id === 'number')
  components: Id[];

  @IsOptional()
  @IsDate()
  dateCreated?: Date;

  @IsOptional()
  @IsNotEmpty()
  notes?: string;
}
