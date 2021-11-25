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
import { FindParams, IColor, Id, IUser, Page } from '../../types';
import { ColorResponse } from './responses/ColorResponse';
import { ColorBody } from './requests/ColorBody';
import { ColorMapper } from '../transformers/ColorMapper';
import { ColorService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/color')
export class ColorController extends EntityController<
  IColor,
  ColorResponse,
  ColorBody
> {
  constructor(service: ColorService, mapper: ColorMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ColorResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ColorResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IColor>
  ): Promise<Page<ColorResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ColorResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ColorBody
  ): Promise<ColorResponse> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ColorResponse)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ColorBody>
  ): Promise<ColorResponse> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ColorResponse)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ColorResponse> {
    return super.delete(user, id);
  }
}
