import { Repository } from 'typeorm';
import { NotFoundError } from 'routing-controllers';

import { EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { FindParams, Id, IEntity, IUser, Page } from '../../types';

interface EntityServiceConfig {
  name: string;
  owned?: boolean;
  relations?: string[];
  cache: boolean;
}

const defaultConfig: EntityServiceConfig = {
  name: 'unknown_entity',
  owned: true,
  relations: undefined,
  cache: false,
};

export class EntityService<T extends IEntity> {
  private get config(): EntityServiceConfig {
    return this._config;
  }

  private set config(value: Partial<EntityServiceConfig>) {
    this._config = { ...defaultConfig, ...value };
  }

  private _config: EntityServiceConfig;

  constructor(
    protected repository: Repository<T>,
    protected eventDispatcher: EventDispatcherInterface,
    config: Partial<EntityServiceConfig>,
  ) {
    this.config = config;
  }

  async findPage(params: FindParams<T>): Promise<Page<T>> {
    const [entities, count] = await this.repository.findAndCount(
      this.buildFindOptions(params)
    );

    await this.setupFoundEntities(entities, params);
    return {
      offset: params.offset,
      items: entities,
      total: count,
    };
  }

  async findByIds(params: FindParams<T>, ids: Id[]): Promise<T[]> {
    const entities = await this.repository.findByIds(
      ids,
      this.buildFindOptions(params)
    );

    await this.setupFoundEntities(entities, params);
    return entities;
  }

  async findOne(
    id: Id,
    user: IUser,
    required: boolean = false
  ): Promise<T | undefined> {
    const params: FindParams<T> = { owner: user, loadRelations: true };
    const entity = await this.repository.findOne(
      id,
      this.buildFindOptions(params)
    );

    if (!entity) {
      if (required) {
        throw new NotFoundError(`not_found_${this.config.name}`);
      }

      return entity;
    }

    await this.setupFoundEntities([entity], params);
    return entity;
  }

  create(entity: Partial<T>, user?: IUser): Promise<T> {
    if (this.config.owned) {
      entity['base'] = { owner: user } as any;
    }

    return this.repository.save(entity as any) as Promise<T>;
  }

  async update(id: Id, entity: T, user?: IUser): Promise<T> {
    const found = await this.findOne(id, user);
    if (!found) {
      return undefined;
    }

    return this.repository.save({
      ...found,
      ...entity,
    } as any) as any;
  }

  async delete(id: Id, user: IUser): Promise<T> {
    const entity = await this.findOne(id, user);
    if (!entity) {
      throw new NotFoundError();
    }

    await this.repository.softDelete(id);
    return entity;
  }

  private buildFindOptions(params: FindParams<T>): any {
    const order: any = {};
    if (!params.sortField) {
      order['id'] = params.sortDirection || 'DESC';
    } else {
      order[params.sortField] = params.sortField || 'ASC';
    }

    for (const key of Object.keys(order)) {
      order[key] = order[key].toLocaleUpperCase();
    }

    return {
      relations: params.loadRelations ? this.config.relations : undefined,
      withDeleted: false,
      skip: params.offset,
      take: params.limit || 50,
      where: this.buildWhere(params.owner),
      order,
      cache: this.config.cache,
    };
  }

  private buildWhere(owner: IUser): any {
    return this.config.owned ? { base: { owner } } : undefined;
  }

  private async setupFoundEntities(
    entities: T[],
    params: FindParams<T>
  ): Promise<void> {
    for (const entity of entities) {
      if (this.config.owned) {
        entity['base'].owner = params.owner;
      }

      if (params.loadRelations && this.config.relations) {
        for (const relation of this.config.relations) {
          entity[relation] = await entity[relation];
        }
      }
    }
  }
}
