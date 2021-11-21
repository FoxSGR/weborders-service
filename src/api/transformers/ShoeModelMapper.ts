import { Mapper } from './Mapper';
import { IShoeModel } from '../../types';
import { ShoeModelResponse } from '../controllers/responses/ShoeModelResponse';
import { ComponentMapper } from './ComponentMapper';

export class ShoeModelMapper implements Mapper<IShoeModel, ShoeModelResponse> {
  toResponse(shoeModel: IShoeModel): ShoeModelResponse {
    const componentMapper = new ComponentMapper();

    return {
      id: shoeModel.id,
      type: shoeModel.type,
      reference: shoeModel.reference,
      components: Array.isArray(shoeModel.components)
        ? shoeModel.components.map((component) =>
            componentMapper.toResponse(component)
          )
        : undefined,
      dateCreated: shoeModel.dateCreated,
      notes: shoeModel.notes,
    };
  }
}
