import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IColor } from '../../types';
import { ColorDTO } from '../controllers/dto/ColorDTO';

@Service()
export class ColorMapper extends Mapper<IColor, ColorDTO> {
  bodyToEntity(body: ColorDTO): Partial<IColor> {
    return {
      name: body.name,
      red: body.red,
      green: body.green,
      blue: body.green,
    };
  }

  entityToResponse(color: IColor): ColorDTO {
    return {
      id: color.id,
      name: color.name,
      red: color.red,
      green: color.green,
      blue: color.blue,
    };
  }
}
