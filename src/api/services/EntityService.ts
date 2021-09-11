/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FindParams } from 'src/types/FindParams';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export abstract class EntityService<T, R extends Repository<T>> {
  constructor(
    @OrmRepository() protected repository: R,
    @EventDispatcher() protected eventDispatcher: EventDispatcherInterface,
    @Logger(__filename) protected log: LoggerInterface
  ) {}

  find(params: FindParams<T>): Promise<T[]> {
    return this.repository.find({

    });
  }

  findOne(id: any): Promise<T | undefined> {
    return this.repository.findOne(id);
  }

  async create(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  update(id: any, entity: T): Promise<T> {
    entity['id'] = id;
    return this.repository.save(entity);
  }

  async delete(id: any): Promise<void> {
    await this.repository.delete(id);
  }
}
