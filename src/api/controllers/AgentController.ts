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
import { FindParams, IAgent, Id, IUser, Page } from '../../types';
import { AgentMapper } from '../transformers/AgentMapper';
import { AgentService } from '../services';
import { AgentDTO } from './dto/AgentDTO';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/agent')
export class AgentController extends EntityController<IAgent, AgentDTO> {
  constructor(service: AgentService, mapper: AgentMapper) {
    super();
    this.mapper = mapper;
    this.service = service;
  }

  @Get('/:id([0-9]+)')
  @ResponseSchema(AgentDTO)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<AgentDTO | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  @ResponseSchema(Page)
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IAgent>
  ): Promise<Page<AgentDTO>> {
    return super.find(user, params);
  }

  @Post()
  @ResponseSchema(AgentDTO)
  public async create(
    @CurrentUser() user: IUser,
    @Body(createBodyOptions) body: Partial<AgentDTO>
  ): Promise<AgentDTO> {
    return super.create(user, body);
  }

  @Put('/:id([0-9]+)')
  public async update(
    @CurrentUser() user: IUser,
    @Param('id') id: Id,
    @Body(updateBodyOptions) body: Partial<AgentDTO>
  ): Promise<AgentDTO> {
    return super.update(user, id, body);
  }

  @Delete('/:id([0-9]+)')
  @ResponseSchema(AgentDTO)
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<AgentDTO> {
    return super.delete(user, id);
  }
}
