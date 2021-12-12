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
import { FindParams, Id, IShoeOrder, IUser, Page } from '../../types';
import { ShoeOrderService } from '../services';
import { ShoeOrderMapper } from '../transformers/ShoeOrderMapper';
import { ShoeOrderDTO } from './dto/ShoeOrderDTO';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/shoe-order')
export class ShoeOrderController extends EntityController<
  IShoeOrder,
  ShoeOrderDTO
> {
  constructor(service: ShoeOrderService, mapper: ShoeOrderMapper) {
    super();
    this.service = service;
    this.mapper = mapper;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ShoeOrderDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeOrderDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IShoeOrder>
  ): Promise<Page<ShoeOrderDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ShoeOrderDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeOrderDTO
  ): Promise<ShoeOrderDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ShoeOrderDTO)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeOrderDTO>
  ): Promise<ShoeOrderDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ShoeOrderDTO)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeOrderDTO> {
    return super.delete(user, id);
  }
}
