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
import { FindParams, IComponent, Id, IUser, Page } from '../../types';
import { ComponentDTO } from './dto/ComponentDTO';
import { ComponentMapper } from '../transformers/ComponentMapper';
import { ComponentService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/component')
export class ComponentController extends EntityController<
  IComponent,
  ComponentDTO
> {
  constructor(service: ComponentService, mapper: ComponentMapper) {
    super();
    this.service = service;
    this.mapper = mapper;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ComponentDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ComponentDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IComponent>
  ): Promise<Page<ComponentDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ComponentDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body(createBodyOptions) body: ComponentDTO
  ): Promise<ComponentDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ComponentDTO)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body(updateBodyOptions) body: Partial<ComponentDTO>
  ): Promise<ComponentDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ComponentDTO)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ComponentDTO> {
    return super.delete(user, id);
  }
}
