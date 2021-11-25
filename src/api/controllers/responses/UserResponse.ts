import { IsArray, IsInt, IsString } from 'class-validator';

import { Id, Role } from '../../../types';

export class UserResponse {
  @IsInt()
  id: Id;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  username: string;
  @IsArray()
  roles: Role[];
}
