import { IsInt, IsString } from 'class-validator';

import { Id } from '../../../types';

export class BrandResponse {
  @IsInt()
  id: Id;
  @IsString()
  name: string;
}
