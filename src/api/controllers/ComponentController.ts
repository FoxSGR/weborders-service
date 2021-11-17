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
import { OpenAPI } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { FindParams, IComponent, IColor, Id, IUser, Page } from '../../types';
import { ComponentResponse } from './responses/ComponentResponse';
import { ComponentBody } from './requests/ComponentBody';
import { ComponentMapper } from '../transformers/ComponentMapper';
import { ColorService, ComponentService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/component')
export class ComponentController extends EntityController<
  IComponent,
  ComponentResponse,
  ComponentBody
> {
  constructor(service: ComponentService, private colorService: ColorService) {
    super();
    this.service = service;
    this.mapper = new ComponentMapper();
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ComponentResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IComponent>
  ): Promise<Page<ComponentResponse>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ComponentBody
  ): Promise<ComponentResponse> {
    return super.create(user, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ComponentResponse> {
    return super.delete(user, id);
  }

  protected async bodyToEntity(
    user: IUser,
    body: ComponentBody
  ): Promise<Partial<IComponent>> {
    let color: IColor;
    if (body.color) {
      color = await this.colorService.findOne(body.color, user, true);
    }

    return {
      name: body.name,
      type: body.type,
      amount: body.amount,
      color,
    };
  }
}
