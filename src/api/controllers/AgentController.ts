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
import { FindParams, IAgent, Id, IUser, Page } from '../../types';
import { AgentResponse } from './responses/AgentResponse';
import { AgentBody } from './requests/AgentBody';
import { AgentMapper } from '../transformers/AgentMapper';
import { AgentService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/agent')
export class AgentController extends EntityController<
  IAgent,
  AgentResponse,
  AgentBody
> {
  constructor(service: AgentService, mapper: AgentMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(AgentResponse)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<AgentResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IAgent>
  ): Promise<Page<AgentResponse>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(AgentResponse)
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: AgentBody
  ): Promise<AgentResponse> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body() body: Partial<AgentBody>
  ): Promise<AgentResponse> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(AgentResponse)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<AgentResponse> {
    return super.delete(user, id);
  }
}
