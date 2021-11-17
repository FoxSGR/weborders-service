import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  QueryParams,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserService } from '../services';
import { EntityController } from './base/EntityController';
import { UserResponse } from './responses/UserResponse';
import { UserMapper } from '../transformers/UserMapper';
import { FindParams, hasPermission, Id, IUser, Page } from '../../types';

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

  @Get('/:id([0-9]+)')
  @ResponseSchema(UserResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<UserResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IUser>
  ): Promise<Page<UserResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(UserResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: IUser
  ): Promise<UserResponse> {
    return super.create(user, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(UserResponse)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<UserResponse> {
    return super.delete(user, id);
  }

  protected hasPermission(
    user: IUser,
    type: 'findOne' | 'findAll' | 'create' | 'update' | 'delete',
    id?: any
  ): boolean {
    if (!super.hasPermission(user, type, id)) {
      return false;
    }

    if (user.id === id) {
      return true;
    }

    return hasPermission(user.roles, 'users.manage');
  }
}
