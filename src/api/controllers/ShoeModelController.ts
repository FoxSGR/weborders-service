import { Authorized, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { IShoeModel, IUser } from '../../types';
import { ShoeModelResponse } from './responses/ShoeModelResponse';
import { ShoeModelBody } from './requests/ShoeModelBody';
import { ShoeModelMapper } from '../transformers/ShoeModelMapper';
import {
  BrandService,
  ClientService,
  ComponentService,
  ShoeModelService,
} from '../services';
import { Brand, Client } from '../models';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/component')
export class ShoeModelController extends EntityController<
  IShoeModel,
  ShoeModelResponse,
  ShoeModelBody
> {
  constructor(
    service: ShoeModelService,
    private brandService: BrandService,
    private clientService: ClientService,
    private componentService: ComponentService
  ) {
    super();
    this.service = service;
    this.mapper = new ShoeModelMapper();
  }

  protected async bodyToEntity(
    user: IUser,
    body: ShoeModelBody
  ): Promise<Partial<IShoeModel>> {
    let client: Client;
    if (body.client) {
      client = await this.clientService.findOne(body.client, user, true);
    }

    let brand: Brand;
    if (body.brand) {
      brand = await this.brandService.findOne(body.brand, user, true);
    }

    const components = await this.componentService.findByIds(
      { owner: user },
      body.components
    );

    return {
      reference: body.reference,
      client,
      brand,
      components,
      dateDelivery: body.dateDelivery,
      dateAsked: body.dateAsked,
      notes: body.notes,
    };
  }
}
