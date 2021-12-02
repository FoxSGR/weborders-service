import { IsNotEmpty } from 'class-validator';

export class LoginBody {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
