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

import { FindParams, IClient, Id, IUser, Page } from '../../types';
import { createBodyOptions, EntityController, updateBodyOptions } from './base/EntityController';
import { ClientDTO } from './dto/ClientDTO';
import { ClientMapper } from '../transformers/ClientMapper';
import { ClientService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/client')
export class ClientController extends EntityController<IClient, ClientDTO> {
  constructor(service: ClientService, mapper: ClientMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ClientDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ClientDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IClient>
  ): Promise<Page<ClientDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ClientDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body(createBodyOptions) body: ClientDTO
  ): Promise<ClientDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ClientDTO)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body(updateBodyOptions) body: Partial<ClientDTO>
  ): Promise<ClientDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ClientDTO)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ClientDTO> {
    return super.delete(user, id);
  }
}
