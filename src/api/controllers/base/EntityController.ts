import { BodyOptions, ForbiddenError } from 'routing-controllers';
import {
  FindParams,
  Id,
  IEntity,
  IUser,
  Page,
  ResponseType,
} from '../../../types';
import { EntityService } from '../../services';
import { Mapper } from '../../transformers/Mapper';

interface EntityControllerConfig {}

const defaultConfig: EntityControllerConfig = {};

const createGroups = ['create'];
const updateGroups = ['update'];
export const createBodyOptions: BodyOptions = {
  validate: { groups: createGroups },
  required: true,
};
export const updateBodyOptions: BodyOptions = {
  validate: { groups: updateGroups },
  required: true,
};

export abstract class EntityController<T extends IEntity, D> {
  protected service: EntityService<T>;
  protected mapper: Mapper<T, D>;

  set config(value: EntityControllerConfig) {
    this._config = { ...defaultConfig, ...value };
  }

  get config(): EntityControllerConfig {
    return this._config;
  }

  private _config = defaultConfig;

  public async findOne(user: IUser, id: Id): Promise<D | undefined> {
    if (!this.hasPermission(user, 'findOne', id)) {
      throw new ForbiddenError();
    }

    const entity = await this.service.findOne(id, user);
    if (entity) {
      return this.toResponse(entity, 'full');
    } else {
      return undefined;
    }
  }

  public async find(
    user: IUser,
    params: FindParams<T> = { owner: user }
  ): Promise<Page<D>> {
    if (!this.hasPermission(user, 'findAll')) {
      throw new ForbiddenError();
    }

    params.owner = user;

    const page = await this.service.findPage(params);
    return {
      ...page,
      items: page.items.map((entity) => this.toResponse(entity)),
    };
  }

  public async create(user: IUser, body: Partial<D>): Promise<D> {
    if (!this.hasPermission(user, 'create')) {
      throw new ForbiddenError();
    }

    const entity = await this.service.create(
      (await this.mapper.bodyToEntity(body, user)) as any,
      user
    );

    return this.toResponse(entity);
  }

  public async update(user: IUser, id: number, body: Partial<D>): Promise<D> {
    if (!this.hasPermission(user, 'update')) {
      throw new ForbiddenError();
    }

    const entity = await this.service.update(
      id,
      (await this.mapper.bodyToEntity(body, user)) as any,
      user
    );

    return this.toResponse(entity);
  }

  public async delete(user: IUser, id: Id): Promise<D> {
    if (!this.hasPermission(user, 'delete', id)) {
      throw new ForbiddenError();
    }

    const entity = await this.service.delete(id, user);
    return this.toResponse(entity);
  }

  protected readonly toResponse = (entity: T, type?: ResponseType) => {
    let response = this.mapper.entityToResponse(entity, type);

    const base = entity['base'];
    if (base) {
      if (base.owner && typeof base.owner === 'object') {
        base.owner = base.owner.id;
      }

      response = {
        ...response,
        ...base,
      };
    }

    return response;
  };

  protected hasPermission(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: IUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type: 'findOne' | 'findAll' | 'create' | 'update' | 'delete',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id?: any
  ): boolean {
    return true;
  }
}
