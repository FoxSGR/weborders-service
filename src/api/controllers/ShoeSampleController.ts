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

import {
  createBodyOptions,
  EntityController,
  updateBodyOptions,
} from './base/EntityController';
import { FindParams, Id, IShoeSample, IUser, Page } from '../../types';
import { ShoeSampleService } from '../services';
import { ShoeSampleMapper } from '../transformers/ShoeSampleMapper';
import { ShoeSampleDTO } from './dto/ShoeSampleDTO';

@Authorized()
@OpenAPI({})
@JsonController('/shoe-sample')
export class ShoeSampleController extends EntityController<
  IShoeSample,
  ShoeSampleDTO
> {
  constructor(service: ShoeSampleService, mapper: ShoeSampleMapper) {
    super();
    this.service = service;
    this.mapper = mapper;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ShoeSampleDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeSampleDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IShoeSample>
  ): Promise<Page<ShoeSampleDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ShoeSampleDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body(createBodyOptions) body: ShoeSampleDTO
  ): Promise<ShoeSampleDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ShoeSampleDTO)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body(updateBodyOptions) body: Partial<ShoeSampleDTO>
  ): Promise<ShoeSampleDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ShoeSampleDTO)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeSampleDTO> {
    return super.delete(user, id);
  }
}
