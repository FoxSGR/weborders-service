import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param, Post,
  Put,
  QueryParams,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { FindParams, Id, IShoeOrder, IUser, Page } from '../../types';
import { ShoeOrderBody } from './requests/ShoeOrderBody';
import { ShoeOrderResponse } from './responses/ShoeOrderResponse';
import { ShoeOrderService } from '../services';
import { ShoeOrderMapper } from '../transformers/ShoeOrderMapper';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/shoe-order')
export class ShoeOrderController extends EntityController<
  IShoeOrder,
  ShoeOrderResponse,
  ShoeOrderBody
  > {
  constructor(service: ShoeOrderService, mapper: ShoeOrderMapper) {
    super();
    this.service = service;
    this.mapper = mapper;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ShoeOrderResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeOrderResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IShoeOrder>
  ): Promise<Page<ShoeOrderResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ShoeOrderResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeOrderBody
  ): Promise<ShoeOrderResponse> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ShoeOrderResponse)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeOrderBody>
  ): Promise<ShoeOrderResponse> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ShoeOrderResponse)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeOrderResponse> {
    return super.delete(user, id);
  }
}
