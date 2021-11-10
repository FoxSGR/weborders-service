import { IEntity } from './IEntity';
import { Role } from './roles';

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Role[];
}
