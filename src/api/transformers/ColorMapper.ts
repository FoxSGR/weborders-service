import { Mapper } from './Mapper';
import { IColor } from '../../types';
import { ColorResponse } from '../controllers/responses/ColorResponse';

export class ColorMapper implements Mapper<IColor, ColorResponse> {
  toResponse(color: IColor): ColorResponse {
    return {
      id: color.id,
      name: color.name,
      red: color.red,
      green: color.green,
      blue: color.blue,
    };
  }
}
