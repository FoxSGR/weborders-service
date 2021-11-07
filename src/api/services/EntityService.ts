import { Repository } from 'typeorm';

import { EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { FindParams } from '../../types/FindParams';
import { IEntity } from '../../types/IEntity';
import { Page } from '../../types/Page';
import { IUser } from '../../types/IUser';
import { NotFoundError } from 'routing-controllers';

interface EntityServiceConfig {
  owned: boolean;
}

const defaultConfig: EntityServiceConfig = {
  owned: true,
};

export abstract class EntityService<T extends IEntity> {
  private get config(): EntityServiceConfig {
    return this._config;
  }
  private set config(value: EntityServiceConfig) {
    this._config = { ...defaultConfig, ...value };
  }
  private _config: EntityServiceConfig;

  protected constructor(
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
      entities.forEach((entity) => (entity['base'].owner = params.owner.id));
    }

    return {
      offset: params.offset,
      items: entities,
      total: count,
    };
  }

  async findOne(id: any, user: IUser): Promise<T | undefined> {
    const entity = await this.repository.findOne(id, {
      where: this.config.owned ? { base: { owner: user } } : undefined,
    });

    if (!entity) {
      return entity;
    }

    if (this.config.owned) {
      entity['base'].owner = user.id;
    }

    return entity;
  }

  create(entity: T, user?: IUser): Promise<T> {
    if (this.config.owned) {
      entity['base'] = { owner: user };
    }

    return this.repository.save(entity);
  }

  async update(id: any, entity: T, user?: IUser): Promise<T> {
    const found = await this.findOne(id, user);
    if (!found) {
      return undefined;
    }

    entity = {
      ...found,
      ...entity,
    };
    return this.repository.save(entity);
  }

  async delete(id: any, user: IUser): Promise<T> {
    const entity = await this.findOne(id, user);
    if (!entity) {
      throw new NotFoundError();
    }

    await this.repository.softDelete(id);
    return entity;
  }
}
