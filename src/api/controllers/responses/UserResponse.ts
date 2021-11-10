import { Id, IUser, Role } from '../../../types';

export class UserResponse implements Partial<IUser> {
  id: Id;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Role[];
}
