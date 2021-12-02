import { IsNotEmpty } from 'class-validator';

import { UserDTO } from './UserDTO';

export abstract class LoginResponse {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  user: UserDTO;
}
