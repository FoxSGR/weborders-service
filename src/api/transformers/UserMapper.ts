import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IUser } from '../../types';
import { UserResponse } from '../controllers/responses/UserResponse';

@Service()
export class UserMapper extends Mapper<IUser, UserResponse, IUser> {
  entityToResponse(entity: IUser): UserResponse {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      firstName: entity.firstName,
      lastName: entity.lastName,
      roles: entity.roles,
    };
  }

  bodyToEntity(body: IUser): Partial<IUser> {
    return {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      username: body.username,
      roles: body.roles,
    };
  }
}
