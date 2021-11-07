import { IsNotEmpty } from 'class-validator';
import { IUser } from '../../../types/IUser';

export abstract class LoginResponse {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  user: IUser;
}
