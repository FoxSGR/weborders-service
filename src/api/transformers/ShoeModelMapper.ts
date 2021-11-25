import { Service } from 'typedi';

import { Mapper } from './Mapper';
import {
  IShoeModel,
  IShoeModelComponent,
  IUser,
  Promial,
  ResponseType,
} from '../../types';
import {
  ShoeModelComponentResponse,
  ShoeModelResponse,
} from '../controllers/responses/ShoeModelResponse';
import { ShoeModelBody } from '../controllers/requests/ShoeModelBody';
import { ComponentMapper } from './ComponentMapper';
import { ColorMapper } from './ColorMapper';
import { ColorService, ComponentService } from '../services';

@Service()
export class ShoeModelMapper extends Mapper<
  IShoeModel,
  ShoeModelResponse,
  ShoeModelBody
> {
  constructor(
    private colorMapper: ColorMapper,
    private colorService: ColorService,
    private componentMapper: ComponentMapper,
    private componentService: ComponentService
  ) {
    super();
  }

  async bodyToEntity(
    body: Partial<ShoeModelBody>,
    user: IUser
  ): Promial<IShoeModel> {
    let modelComponents: IShoeModelComponent[];
    if (body.components) {
      const components = await this.componentService.findByIds(
        { owner: user },
        body.components.map((component) => component.component)
      );

      const colors = await this.colorService.findByIds(
        { owner: user },
        body.components.map((component) => component.color)
      );

      // create the model to component link
      modelComponents = components.map((component) => {
        const input = body.components.find((c) => c.component === component.id);
        return {
          component,
          amount: input.amount,
          price: input.price,
          color: input.color
            ? colors.find((c) => c.id === input.color)
            : undefined,
        };
      });
    }

    return {
      type: 'base',
      reference: body.reference,
      components: modelComponents,
      dateCreated: body.dateCreated,
      season: body.season
        ? {
          year: body.season.year,
          seasons: body.season.seasons,
        }
        : undefined,
      notes: body.notes,
    };
  }

  entityToResponse(
    shoeModel: IShoeModel,
    type?: ResponseType
  ): ShoeModelResponse {
    let components: ShoeModelComponentResponse[] = undefined;
    if (type === 'full') {
      components = shoeModel.components.map((component) => ({
        component: this.fieldToResponse(
          this.componentMapper,
          component.component
        ),
        amount: component.amount,
        price: component.price,
        color: this.fieldToResponse(this.colorMapper, component.color),
      }));
    }

    return {
      id: shoeModel.id,
      type: shoeModel.type,
      reference: shoeModel.reference,
      components,
      dateCreated: shoeModel.dateCreated,
      seasons: {
        year: shoeModel.season.year,
        seasons: shoeModel.season.seasons,
      },
      notes: shoeModel.notes,
    };
  }
}
