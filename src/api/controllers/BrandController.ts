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
import { FindParams, IBrand, Id, IUser, Page } from '../../types';
import { BrandResponse } from './responses/BrandResponse';
import { BrandBody } from './requests/BrandBody';
import { BrandMapper } from '../transformers/BrandMapper';
import { BrandService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/brand')
export class BrandController extends EntityController<
  IBrand,
  BrandResponse,
  BrandBody
> {
  constructor(service: BrandService) {
    super();
    this.mapper = new BrandMapper();
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<BrandResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IBrand>
  ): Promise<Page<BrandResponse>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: BrandBody
  ): Promise<BrandResponse> {
    return super.create(user, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<BrandResponse> {
    return super.delete(user, id);
  }
}
