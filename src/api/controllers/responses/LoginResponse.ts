import { IsNotEmpty } from 'class-validator';

import { UserResponse } from './UserResponse';

export abstract class LoginResponse {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  user: UserResponse;
}
