import { Mapper } from './Mapper';
import { IShoeModel } from '../../types';
import { ShoeModelResponse } from '../controllers/responses/ShoeModelResponse';
import { BrandMapper } from './BrandMapper';
import { ComponentMapper } from './ComponentMapper';
import { ClientMapper } from './ClientMapper';

export class ShoeModelMapper implements Mapper<IShoeModel, ShoeModelResponse> {
  toResponse(shoeModel: IShoeModel): ShoeModelResponse {
    const brandMapper = new BrandMapper();
    const clientMapper = new ClientMapper();
    const componentMapper = new ComponentMapper();

    return {
      id: shoeModel.id,
      reference: shoeModel.reference,
      brand: shoeModel.brand
        ? brandMapper.toResponse(shoeModel.brand)
        : undefined,
      client: shoeModel.client
        ? clientMapper.toResponse(shoeModel.client)
        : undefined,
      components: shoeModel.components.map((component) =>
        componentMapper.toResponse(component)
      ),
      dateAsked: shoeModel.dateAsked,
      dateDelivery: shoeModel.dateDelivery,
      notes: shoeModel.notes,
    };
  }
}
