import { Request } from 'express';
import { Authorized, Get, JsonController, Req } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { EntityController } from './EntityController';
import { UserResponse } from './responses/UserResponse';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/user')
export class UserController extends EntityController<User, UserResponse> {
  constructor(service: UserService) {
    super(service);
  }

  @Get('/me')
  @ResponseSchema(UserResponse, { isArray: true })
  public findMe(@Req() req: Request): Promise<User[]> {
    return req['user'];
  }

  protected toResponse(entity: User): UserResponse {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      firstName: entity.firstName,
      lastName: entity.lastName,
    };
  }
}
