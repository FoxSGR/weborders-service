import { Service } from 'typedi';

import { Mapper } from './Mapper';
import {
  IShoeOrder,
  IShoeSample,
  IUser,
  Promial,
  ResponseType,
} from '../../types';
import { ShoeSampleService } from '../services';
import { ShoeSampleMapper } from './ShoeSampleMapper';
import { ShoeOrderDTO } from '../controllers/dto/ShoeOrderDTO';

@Service()
export class ShoeOrderMapper extends Mapper<IShoeOrder, ShoeOrderDTO> {
  constructor(
    private sampleMapper: ShoeSampleMapper,
    private sampleService: ShoeSampleService
  ) {
    super();
  }

  async bodyToEntity(
    body: Partial<ShoeOrderDTO>,
    user: IUser
  ): Promial<IShoeOrder> {
    const sample: IShoeSample = await this.find(
      this.sampleService,
      user,
      body.sample?.id
    );
    return {
      sample,
      model: sample?.sampleModel, // for now, the model is always the sample model
      dateAsked: body.dateAsked,
      dateDelivery: body.dateDelivery,
      notes: body.notes,
      sizes: body.sizes,
    };
  }

  entityToResponse(order: IShoeOrder, type?: ResponseType): ShoeOrderDTO {
    return {
      id: order.id,
      sample: this.fieldToResponse(this.sampleMapper, order.sample, type),
      dateAsked: order.dateAsked,
      dateDelivery: order.dateDelivery,
      notes: order.notes,
      sizes: order.sizes,
    };
  }
}
