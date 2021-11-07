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
import { FindParams } from '../../../types/FindParams';
import { IEntity } from '../../../types/IEntity';
import { Page } from '../../../types/Page';
import { EntityService } from '../../services/EntityService';
import { IUser } from '../../../types/IUser';
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
    @Param('id') id: string
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
    @QueryParams() params?: FindParams<T>
  ): Promise<Page<U>> {
    if (!this.hasPermission(user, 'findAll')) {
      throw new ForbiddenError();
    }

    params.owner = user;

    const page = await this.service.find(params);
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

    const entity = await this.service.create(this.bodyToEntity(body), user);
    return this.toResponse(entity);
  }

  @Delete('/:id')
  public async delete(
    @CurrentUser() user: IUser,
    @Param('id') id: string
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
      response = {
        ...response,
        ...base,
      };
    }

    return response;
  };

  protected bodyToEntity(body: B): T {
    return body as any as T;
  }

  protected hasPermission(
    user: IUser,
    type: 'findOne' | 'findAll' | 'create' | 'update' | 'delete',
    id?: any
  ): boolean {
    return true;
  }
}
