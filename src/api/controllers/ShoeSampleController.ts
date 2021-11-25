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
import { FindParams, Id, IShoeSample, IUser, Page } from '../../types';
import { ShoeSampleBody } from './requests/ShoeSampleBody';
import { ShoeSampleResponse } from './responses/ShoeSampleResponse';
import { ShoeSampleService } from '../services';
import { ShoeSampleMapper } from '../transformers/ShoeSampleMapper';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/shoe-sample')
export class ShoeSampleController extends EntityController<
  IShoeSample,
  ShoeSampleResponse,
  ShoeSampleBody
> {
  constructor(service: ShoeSampleService, mapper: ShoeSampleMapper) {
    super();
    this.service = service;
    this.mapper = mapper;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ShoeSampleResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeSampleResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IShoeSample>
  ): Promise<Page<ShoeSampleResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ShoeSampleResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeSampleBody
  ): Promise<ShoeSampleResponse> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ShoeSampleResponse)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeSampleBody>
  ): Promise<ShoeSampleResponse> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ShoeSampleResponse)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeSampleResponse> {
    return super.delete(user, id);
  }
}
