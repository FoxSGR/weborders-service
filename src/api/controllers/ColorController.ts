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
import { FindParams, IColor, Id, IUser, Page } from '../../types';
import { ColorDTO } from './dto/ColorDTO';
import { ColorMapper } from '../transformers/ColorMapper';
import { ColorService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/color')
export class ColorController extends EntityController<IColor, ColorDTO> {
  constructor(service: ColorService, mapper: ColorMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ColorDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ColorDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IColor>
  ): Promise<Page<ColorDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ColorDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body(createBodyOptions) body: ColorDTO
  ): Promise<ColorDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ColorDTO)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body(updateBodyOptions) body: Partial<ColorDTO>
  ): Promise<ColorDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ColorDTO)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ColorDTO> {
    return super.delete(user, id);
  }
}
