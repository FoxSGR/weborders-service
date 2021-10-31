import {
  Body,
  Controller,
  Get,
  MethodNotAllowedError,
  NotFoundError,
  Param,
  Post,
  QueryParams,
} from 'routing-controllers';
import { FindParams } from '../../../types/FindParams';
import { IEntity } from '../../../types/IEntity';
import { Page } from '../../../types/Page';
import { EntityService } from '../../services/EntityService';

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

  set config(value: EntityControllerConfig) {
    this._config = { ...defaultConfig, ...value };
  }
  get config(): EntityControllerConfig {
    return this._config;
  }
  private _config = defaultConfig;

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<U> {
    const entity = await this.service.findOne(id);
    if (entity) {
      return this.toResponse(entity);
    } else {
      throw new NotFoundError();
    }
  }

  @Get()
  public async find(@QueryParams() params?: FindParams<T>): Promise<Page<U>> {
    const page = await this.service.find(params);
    return {
      ...page,
      items: page.items.map((entity) => this.toResponse(entity)),
    };
  }

  @Post()
  public async create(@Body({ required: true }) body: B): Promise<U> {
    if (!this.config.create) {
      throw new MethodNotAllowedError();
    }

    const entity = await this.service.create(this.bodyToEntity(body));
    return this.toResponse(entity);
  }

  protected abstract toResponse(entity: T): U;
  protected bodyToEntity(body: B): T {
    return body as any as T;
  }
}
