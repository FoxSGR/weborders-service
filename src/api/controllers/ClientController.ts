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
import { EntityController } from './base/EntityController';
import { ClientResponse } from './responses/ClientResponse';
import { ClientBody } from './requests/ClientBody';
import { ClientMapper } from '../transformers/ClientMapper';
import { ClientService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/client')
export class ClientController extends EntityController<
  IClient,
  ClientResponse,
  ClientBody
> {
  constructor(service: ClientService, mapper: ClientMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(ClientResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ClientResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IClient>
  ): Promise<Page<ClientResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(ClientResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ClientBody
  ): Promise<ClientResponse> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  @ResponseSchema(ClientResponse)
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<ClientBody>
  ): Promise<ClientResponse> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(ClientResponse)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ClientResponse> {
    return super.delete(user, id);
  }
}
