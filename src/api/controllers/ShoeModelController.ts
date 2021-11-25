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
  UploadedFiles,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Inject } from 'typedi';
import fs from 'fs';

import { EntityController } from './base/EntityController';
import { FindParams, IShoeModel, Id, IUser, Page } from '../../types';
import { ShoeModelResponse } from './responses/ShoeModelResponse';
import { ShoeModelBody } from './requests/ShoeModelBody';
import { ShoeModelMapper } from '../transformers/ShoeModelMapper';
import { ShoeModelService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/shoe-model')
export class ShoeModelController extends EntityController<
  IShoeModel,
  ShoeModelResponse,
  ShoeModelBody
> {
  constructor(
    @Inject('dataDir') private dataDir: string,
    service: ShoeModelService,
    mapper: ShoeModelMapper
  ) {
    super();
    this.service = service;
    this.mapper = mapper;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ShoeModelResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeModelResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IShoeModel>
  ): Promise<Page<ShoeModelResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ShoeModelResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeModelBody
  ): Promise<ShoeModelResponse> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ShoeModelResponse)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ShoeModelBody>
  ): Promise<ShoeModelResponse> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeModelResponse> {
    return super.delete(user, id);
  }

  @Post('/:id([0-9]+)/photo')
  async handleFileUpload(
    @UploadedFiles('photos') photos: Express.Multer.File[],
    @Param('id') id: Id
  ): Promise<any> {
    // TODO: validate model
    for (const photo of photos) {
      await fs.promises.writeFile(this.dataDir, photo.originalname);
    }

    return {
      status: 'OK',
    };
  }
}
