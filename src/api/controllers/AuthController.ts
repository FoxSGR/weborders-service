import { Body, JsonController, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AuthService } from '../services/AuthService';
import { LoginBody } from './requests';
import { LoginResponse } from './responses';

@JsonController('/auth')
@OpenAPI({})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ResponseSchema(LoginResponse)
  login(@Body({ required: true }) body: LoginBody): Promise<LoginResponse> {
    return this.authService.login(body.username, body.password);
  }
}
