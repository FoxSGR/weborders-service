import { Mapper } from './Mapper';
import { IUser } from '../../types';
import { UserResponse } from '../controllers/responses/UserResponse';

export class UserMapper implements Mapper<IUser, UserResponse> {
  toResponse(entity: IUser): UserResponse {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      firstName: entity.firstName,
      lastName: entity.lastName,
      roles: entity.roles,
    };
  }
}
