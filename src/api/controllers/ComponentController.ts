import { Authorized, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { IColor, IComponent, IUser } from '../../types';
import { ComponentResponse } from './responses/ComponentResponse';
import { ComponentBody } from './requests/ComponentBody';
import { ComponentMapper } from '../transformers/ComponentMapper';
import { ColorService, ComponentService } from '../services';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/component')
export class ComponentController extends EntityController<
  IComponent,
  ComponentResponse,
  ComponentBody
> {
  constructor(service: ComponentService, private colorService: ColorService) {
    super();
    this.service = service;
    this.mapper = new ComponentMapper();
  }

  protected async;

  async bodyToEntity(
    user: IUser,
    body: ComponentBody
  ): Promise<Partial<IComponent>> {
    let color: IColor;
    if (body.color) {
      color = await this.colorService.findOne(body.color, user, true);
    }

    return {
      name: body.name,
      type: body.type,
      amount: body.amount,
      color,
    };
  }
}
