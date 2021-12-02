import { Service } from 'typedi';

import { Mapper } from './Mapper';
import { IUser } from '../../types';
import { UserDTO } from '../controllers/dto/UserDTO';

@Service()
export class UserMapper extends Mapper<IUser, UserDTO> {
  entityToResponse(entity: IUser): UserDTO {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      firstName: entity.firstName,
      lastName: entity.lastName,
      roles: entity.roles,
    };
  }

  bodyToEntity(body: IUser): Partial<UserDTO> {
    return {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      username: body.username,
      roles: body.roles,
    };
  }
}
