import { Repository } from 'typeorm';
import { NotFoundError } from 'routing-controllers';

import { EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { FindParams, Id, IEntity, IUser, Page } from '../../types';

interface EntityServiceConfig {
  owned: boolean;
}

const defaultConfig: EntityServiceConfig = {
  owned: true,
};

export class EntityService<T extends IEntity> {
  private get config(): EntityServiceConfig {
    return this._config;
  }

  private set config(value: EntityServiceConfig) {
    this._config = { ...defaultConfig, ...value };
  }

  private _config: EntityServiceConfig;

  constructor(
    protected repository: Repository<T>,
    protected eventDispatcher: EventDispatcherInterface,
    config: EntityServiceConfig = defaultConfig
  ) {
    this.config = config;
  }

  async find(params?: FindParams<T>): Promise<Page<T>> {
    const order: any = {};
    if (!params.sortField) {
      order['id'] = params.sortDirection || 'DESC';
    } else {
      order[params.sortField] = params.sortField || 'ASC';
    }

    const [entities, count] = await this.repository.findAndCount({
      skip: params.offset,
      take: params.limit || 50,
      where: this.config.owned ? { base: { owner: params.owner } } : undefined,
      withDeleted: false,
      order,
    });

    if (this.config.owned) {
      entities.forEach((entity) => (entity['base'].owner = params.owner));
    }

    return {
      offset: params.offset,
      items: entities,
      total: count,
    };
  }

  async findOne(id: Id, user: IUser): Promise<T | undefined> {
    const entity = await this.repository.findOne(id, {
      where: this.config.owned ? { base: { owner: user } } : undefined,
    });

    if (!entity) {
      return entity;
    }

    if (this.config.owned) {
      entity['base'].owner = user;
    }

    return entity;
  }

  create(entity: Partial<T>, user?: IUser): Promise<T> {
    if (this.config.owned) {
      entity['base'] = { owner: user };
    }

    return this.repository.save(entity as any);
  }

  async update(id: Id, entity: T, user?: IUser): Promise<T> {
    const found = await this.findOne(id, user);
    if (!found) {
      return undefined;
    }

    return this.repository.save({
      ...found,
      ...entity,
    } as any);
  }

  async delete(id: Id, user: IUser): Promise<T> {
    const entity = await this.findOne(id, user);
    if (!entity) {
      throw new NotFoundError();
    }

    await this.repository.softDelete(id);
    return entity;
  }
}
