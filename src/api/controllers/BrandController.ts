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

import { createBodyOptions, EntityController, updateBodyOptions } from './base/EntityController';
import { FindParams, IBrand, Id, IUser, Page } from '../../types';
import { BrandMapper } from '../transformers/BrandMapper';
import { BrandService } from '../services';
import { BrandDTO } from './dto/BrandDTO';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/brand')
export class BrandController extends EntityController<IBrand, BrandDTO> {
  constructor(service: BrandService, mapper: BrandMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(BrandDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<BrandDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IBrand>
  ): Promise<Page<BrandDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(BrandDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body(createBodyOptions) body: BrandDTO
  ): Promise<BrandDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(BrandDTO)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body(updateBodyOptions) body: Partial<BrandDTO>
  ): Promise<BrandDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(BrandDTO)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<BrandDTO> {
    return super.delete(user, id);
  }
}
