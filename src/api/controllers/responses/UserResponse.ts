import { IUser, Role } from '../../../types';

export class UserResponse implements Partial<IUser> {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Role[];
}
