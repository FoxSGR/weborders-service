import { IsNotEmpty } from 'class-validator';

export abstract class LoginResponse {
  @IsNotEmpty()
  token: string;
}
