import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserService } from '../services/UserService';
import { EntityController } from './base/EntityController';
import { UserResponse } from './responses/UserResponse';
import { UserMapper } from '../transformers/UserMapper';
import { hasPermission, IUser } from '../../types';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/user')
export class UserController extends EntityController<IUser, UserResponse> {
  constructor(service: UserService) {
    super();
    this.service = service;
    this.mapper = new UserMapper();
  }

  @Get('/me')
  @ResponseSchema(UserResponse, { isArray: true })
  public findMe(@CurrentUser() user: IUser): UserResponse {
    return this.toResponse(user);
  }

  protected hasPermission(
    user: IUser,
    type: 'findOne' | 'findAll' | 'create' | 'update' | 'delete',
    id?: any
  ): boolean {
    if (user.id === id && type === 'delete') {
      return false;
    }

    if (user.id === id) {
      return true;
    }

    return hasPermission(user.roles, 'users.manage');
  }
}
