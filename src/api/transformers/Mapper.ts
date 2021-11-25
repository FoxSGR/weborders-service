import { DeepPartial } from 'typeorm';

import { IUser, Promial, ResponseType } from '../../types';
import { EntityService } from '../services';

export abstract class Mapper<T, U, B> {
  abstract bodyToEntity(
    body: Partial<B>,
    user: IUser
  ): Promial<T> | DeepPartial<T>;

  abstract entityToResponse(input: T, type?: ResponseType): U;

  protected async find(
    service: EntityService<any>,
    user: IUser,
    key: number
  ): Promise<any> {
    if (key) {
      return await service.findOne(key, user, true);
    } else {
      return null;
    }
  }

  protected fieldToResponse(
    mapper: Mapper<any, any, any>,
    data: any,
    type?: ResponseType
  ): any {
    if (data) {
      return mapper.entityToResponse(data, type);
    } else {
      return undefined;
    }
  }

  protected fieldToEntity(
    mapper: Mapper<any, any, any>,
    user: IUser,
    data: any
  ): any {
    if (data) {
      return mapper.bodyToEntity(data, user);
    } else {
      return undefined;
    }
  }

  protected fieldToEntityAsync(
    mapper: Mapper<any, any, any>,
    user: IUser,
    data: any
  ): Promial<any> {
    if (data) {
      return mapper.bodyToEntity(data, user) as Promial<any>;
    } else {
      return undefined;
    }
  }
}
