import { Get, NotFoundError, Param, QueryParams } from 'routing-controllers';
import { FindParams } from '../../types/FindParams';
import { IEntity } from '../../types/IEntity';
import { Page } from '../../types/Page';
import { EntityService } from '../services/EntityService';

export abstract class EntityController<T extends IEntity, U> {
  constructor(protected service: EntityService<T>) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<U> {
    const entity = await this.service.findOne(id);
    if (entity) {
      return this.toResponse(entity);
    } else {
      throw new NotFoundError();
    }
  }

  @Get()
  async find(@QueryParams() params?: FindParams<T>): Promise<Page<U>> {
    const page = await this.service.find(params);
    return {
      ...page,
      items: page.items.map((entity) => this.toResponse(entity)),
    };
  }

  abstract toResponse(entity: T): U;
}
