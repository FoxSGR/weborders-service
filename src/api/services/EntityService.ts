import { Repository } from 'typeorm';
import { NotFoundError } from 'routing-controllers';

import { EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { FindParams, Id, IEntity, IUser, Page } from '../../types';

interface EntityServiceConfig {
  name: string;
  owned?: boolean;
}

const defaultConfig: EntityServiceConfig = {
  name: 'unknown_entity',
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
    config: EntityServiceConfig
  ) {
    this.config = config;
  }

  async findPage(params: FindParams<T>): Promise<Page<T>> {
    const [entities, count] = await this.repository.findAndCount(
      this.buildFindOptions(params)
    );

    this.setupFoundEntities(entities, params.owner);
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

    this.setupFoundEntities(entities, params.owner);
    return entities;
  }

  async findOne(
    id: Id,
    user: IUser,
    required: boolean = false
  ): Promise<T | undefined> {
    const entity = await this.repository.findOne(
      id,
      this.buildFindOptions({ owner: user })
    );

    if (!entity) {
      if (required) {
        throw new NotFoundError(`not_found_${this.config.name}`);
      }

      return entity;
    }

    this.setupFoundEntities([entity], user);
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

  private buildFindOptions(params: FindParams<T>): any {
    const order: any = {};
    if (!params.sortField) {
      order['id'] = params.sortDirection || 'desc';
    } else {
      order[params.sortField] = params.sortField || 'asc';
    }

    return {
      withDeleted: false,
      skip: params.offset,
      take: params.limit || 50,
      where: this.buildWhere(params.owner),
      order,
    };
  }

  private buildWhere(owner: IUser): any {
    return this.config.owned ? { base: { owner } } : undefined;
  }

  private setupFoundEntities(entities: T[], owner: IUser): void {
    if (this.config.owned) {
      entities.forEach((entity) => (entity['base'].owner = owner));
    }
  }
}
