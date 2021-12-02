import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserService } from '../services';
import {
  createBodyOptions,
  EntityController,
  updateBodyOptions,
} from './base/EntityController';
import { UserDTO } from './dto/UserDTO';
import { UserMapper } from '../transformers/UserMapper';
import { FindParams, hasPermission, Id, IUser, Page } from '../../types';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/user')
export class UserController extends EntityController<IUser, UserDTO> {
  constructor(service: UserService, mapper: UserMapper) {
    super();
    this.service = service;
    this.mapper = mapper;
  }

  @Get('/me')
  @ResponseSchema(UserDTO)
  public findMe(@CurrentUser() user: IUser): UserDTO {
    return this.toResponse(user);
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(UserDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<UserDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IUser>
  ): Promise<Page<UserDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(UserDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body(createBodyOptions) body: IUser
  ): Promise<UserDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(UserDTO)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body(updateBodyOptions) body: Partial<IUser>
  ): Promise<UserDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(UserDTO)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<UserDTO> {
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
