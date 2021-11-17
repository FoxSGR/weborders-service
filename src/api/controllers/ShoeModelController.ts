import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  QueryParams,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { FindParams, IShoeModel, Id, IUser, Page } from '../../types';
import { ShoeModelResponse } from './responses/ShoeModelResponse';
import { ShoeModelBody } from './requests/ShoeModelBody';
import { ShoeModelMapper } from '../transformers/ShoeModelMapper';
import { ComponentService, ShoeModelService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/shoe-model')
export class ShoeModelController extends EntityController<
  IShoeModel,
  ShoeModelResponse,
  ShoeModelBody
> {
  constructor(
    service: ShoeModelService,
    private componentService: ComponentService
  ) {
    super();
    this.service = service;
    this.mapper = new ShoeModelMapper();
  }

  @Get('/:id([0-9]+)')
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeModelResponse | undefined> {
    return super.findOne(user, id);
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params?: FindParams<IShoeModel>
  ): Promise<Page<ShoeModelResponse>> {
    return super.find(user, params);
  }

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body() body: ShoeModelBody
  ): Promise<ShoeModelResponse> {
    return super.create(user, body);
  }

  @Delete('/:id([0-9]+)')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<ShoeModelResponse> {
    return super.delete(user, id);
  }

  protected async bodyToEntity(
    user: IUser,
    body: ShoeModelBody
  ): Promise<Partial<IShoeModel>> {
    // let client: Client;
    // if (body.client) {
    //   client = await this.clientService.findOne(body.client, user, true);
    // }
    //
    // let brand: ShoeModel;
    // if (body.brand) {
    //   brand = await this.brandService.findOne(body.brand, user, true);
    // }

    const components = await this.componentService.findByIds(
      { owner: user },
      body.components
    );

    return {
      reference: body.reference,
      components,
      dateDelivery: body.dateDelivery,
      dateAsked: body.dateAsked,
      notes: body.notes,
    };
  }
}
