import { Body, JsonController, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AuthService } from '../services';
import { LoginBody } from './requests/LoginBody';
import { LoginResponse } from './responses/LoginResponse';
import { UserMapper } from '../transformers/UserMapper';

@JsonController('/auth')
@OpenAPI({})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ResponseSchema(LoginResponse)
  async login(
    @Body({ required: true }) body: LoginBody
  ): Promise<LoginResponse> {
    const result = await this.authService.login(body.username, body.password);
    if (result) {
      const userMapper = new UserMapper();
      return {
        token: result.token,
        user: userMapper.toResponse(result.user),
      };
    } else {
      return result;
    }
  }
}
