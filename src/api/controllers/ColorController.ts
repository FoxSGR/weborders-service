import { Authorized, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import { EntityController } from './base/EntityController';
import { IColor } from '../../types';
import { ColorResponse } from './responses/ColorResponse';
import { ColorBody } from './requests/ColorBody';
import { ColorMapper } from '../transformers/ColorMapper';
import { ColorService } from '../services/ColorService';

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }] })
@JsonController('/color')
export class ColorController extends EntityController<
  IColor,
  ColorResponse,
  ColorBody
> {
  constructor(service: ColorService) {
    super();
    this.mapper = new ColorMapper();
    this.service = service;
  }
}
