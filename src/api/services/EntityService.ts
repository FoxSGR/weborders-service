import { Repository } from 'typeorm';

import { EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { FindParams } from '../../types/FindParams';
import { IEntity } from '../../types/IEntity';
import { Page } from '../../types/Page';

export abstract class EntityService<T extends IEntity> {
  constructor(
    protected repository: Repository<T>,
    protected eventDispatcher: EventDispatcherInterface
  ) {}

  async find(params?: FindParams<T>): Promise<Page<T>> {
    const entities = await this.repository.find({
      skip: params.offset,
      take: params.limit || 50,
    });

    return {
      offset: params.offset,
      items: entities,
      total: entities.length, // to-do
    };
  }

  findOne(id: any): Promise<T | undefined> {
    return this.repository.findOne(id);
  }

  create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  update(id: any, entity: T): Promise<T> {
    entity['id'] = id;
    return this.repository.save(entity);
  }

  async delete(id: any): Promise<void> {
    await this.repository.delete(id);
  }
}
