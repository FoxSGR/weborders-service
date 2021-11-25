import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IColor } from '../../types';
import { ColorResponse } from '../controllers/responses/ColorResponse';
import { ColorBody } from '../controllers/requests/ColorBody';

@Service()
export class ColorMapper extends Mapper<IColor, ColorResponse, ColorBody> {
  bodyToEntity(body: ColorBody): Partial<IColor> {
    return {
      name: body.name,
      red: body.red,
      green: body.green,
      blue: body.green,
    };
  }

  entityToResponse(color: IColor): ColorResponse {
    return {
      id: color.id,
      name: color.name,
      red: color.red,
      green: color.green,
      blue: color.blue,
    };
  }
}
