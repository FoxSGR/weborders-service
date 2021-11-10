import { getRepository } from 'typeorm';
import { Authorized, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { EntityController } from './base/EntityController';
import { IColor, IComponent, IUser } from '../../types';
import { ComponentResponse } from './responses/ComponentResponse';
import { ComponentBody } from './requests/ComponentBody';
import { ComponentMapper } from '../transformers/ComponentMapper';
import { EntityService } from '../services/EntityService';
import { Component } from '../models/Component';
import { ColorService } from '../services/ColorService';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/component')
export class ComponentController extends EntityController<
  IComponent,
  ComponentResponse,
  ComponentBody
> {
  constructor(
    private colorService: ColorService,
    @EventDispatcher() eventDispatcher: EventDispatcherInterface
  ) {
    super();
    this.mapper = new ComponentMapper();
    this.service = new EntityService(getRepository(Component), eventDispatcher);
  }

  protected async bodyToEntity(
    user: IUser,
    body: ComponentBody
  ): Promise<Partial<IComponent>> {
    let color: IColor;
    if (body.color) {
      color = await this.colorService.findOne(body.color, user);
    }

    return {
      ...body,
      color,
    };
  }
}
