import { Body, JsonController, Post } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { AuthService } from '../services/AuthService';
import { LoginBody } from './requests';
import { LoginResponse } from './responses';

@JsonController('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ResponseSchema(LoginResponse)
  login(@Body({ required: true }) body: LoginBody): Promise<LoginResponse> {
    return this.authService.login(body.username, body.password);
  }
}
