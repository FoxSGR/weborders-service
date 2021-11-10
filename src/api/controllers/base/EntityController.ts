import {
  Body,
  Controller,
  CurrentUser,
  Delete,
  ForbiddenError,
  Get,
  MethodNotAllowedError,
  OnUndefined,
  Param,
  Post,
  QueryParams,
} from 'routing-controllers';
import { FindParams, Id, IEntity, IUser, Page } from '../../../types';
import { EntityService } from '../../services';
import { Mapper } from '../../transformers/Mapper';

interface EntityControllerConfig {
  create?: boolean;
  update?: boolean;
  delete?: boolean;
}

const defaultConfig: EntityControllerConfig = {
  create: true,
  update: true,
  delete: true,
};

@Controller()
export abstract class EntityController<T extends IEntity, U, B = any> {
  protected service: EntityService<T>;
  protected mapper: Mapper<T, U>;

  set config(value: EntityControllerConfig) {
    this._config = { ...defaultConfig, ...value };
  }

  get config(): EntityControllerConfig {
    return this._config;
  }

  private _config = defaultConfig;

  @Get('/:id([0-9]+)')
  @OnUndefined(404)
  public async findOne(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<U | undefined> {
    if (!this.hasPermission(user, 'findOne', id)) {
      throw new ForbiddenError();
    }

    const entity = await this.service.findOne(id, user);
    if (entity) {
      return this.toResponse(entity);
    } else {
      return undefined;
    }
  }

  @Get()
  public async find(
    @CurrentUser() user: IUser,
    @QueryParams() params: FindParams<T> = { owner: user }
  ): Promise<Page<U>> {
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

  @Post()
  public async create(
    @CurrentUser() user: IUser,
    @Body({ required: true }) body: B
  ): Promise<U> {
    if (!this.config.create) {
      throw new MethodNotAllowedError();
    } else if (!this.hasPermission(user, 'create')) {
      throw new ForbiddenError();
    }

    const entity = await this.service.create(
      await this.bodyToEntity(user, body),
      user
    );

    return this.toResponse(entity);
  }

  @Delete('/:id')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: Id
  ): Promise<U> {
    if (!this.config.delete) {
      throw new MethodNotAllowedError();
    } else if (!this.hasPermission(user, 'delete', id)) {
      throw new ForbiddenError();
    }

    const entity = await this.service.delete(id, user);
    return this.toResponse(entity);
  }

  protected readonly toResponse = (entity: T) => {
    let response = this.mapper.toResponse(entity);

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

  protected bodyToEntity(user: IUser, body: B): Promise<Partial<T>> {
    return Promise.resolve(body as any as T);
  }

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
