import { IUser } from '../../../types/IUser';
import { Role } from '../../../types/roles';

export class UserResponse implements Partial<IUser> {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: Role[];
}
