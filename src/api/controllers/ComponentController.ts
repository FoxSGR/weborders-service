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

import { EntityController } from './base/EntityController';
import { FindParams, IComponent, Id, IUser, Page } from '../../types';
import { ComponentResponse } from './responses/ComponentResponse';
import { ComponentBody } from './requests/ComponentBody';
import { ComponentMapper } from '../transformers/ComponentMapper';
import { ComponentService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/component')
export class ComponentController extends EntityController<
  IComponent,
  ComponentResponse,
  ComponentBody
> {
  constructor(service: ComponentService, mapper: ComponentMapper) {
    super();
    this.service = service;
    this.mapper = mapper;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ComponentResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ComponentResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IComponent>
  ): Promise<Page<ComponentResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ComponentResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ComponentBody
  ): Promise<ComponentResponse> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ComponentResponse)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ComponentBody>
  ): Promise<ComponentResponse> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ComponentResponse)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ComponentResponse> {
    return super.delete(user, id);
  }
}
