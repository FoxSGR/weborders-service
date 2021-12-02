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

import {
  createBodyOptions,
  EntityController,
  updateBodyOptions,
} from './base/EntityController';
import { FindParams, Id, IShoeModel, IUser, Page } from '../../types';
import { ShoeModelDTO } from './dto/ShoeModelDTO';
import { ShoeModelMapper } from '../transformers/ShoeModelMapper';
import { ShoeModelService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/shoe-model')
export class ShoeModelController extends EntityController<
  IShoeModel,
  ShoeModelDTO
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
  @ResponseSchema(ShoeModelDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeModelDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IShoeModel>
  ): Promise<Page<ShoeModelDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ShoeModelDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body(createBodyOptions) body: ShoeModelDTO
  ): Promise<ShoeModelDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ShoeModelDTO)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body(updateBodyOptions) body: Partial<ShoeModelDTO>
  ): Promise<ShoeModelDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeModelDTO> {
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
