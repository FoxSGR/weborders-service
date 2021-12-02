import { IsArray, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { Id, Role } from '../../../types';

export class UserDTO {
  @IsOptional()
  id: Id;

  @IsString()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  firstName: string;

  @IsString()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  lastName: string;

  @IsString()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  email: string;

  @IsString()
  @IsOptional({ groups: ['update'] })
  @Type(() => String)
  username: string;

  @IsArray()
  @IsOptional({ groups: ['update'] })
  @Type(() => Array)
  roles: Role[];
}
