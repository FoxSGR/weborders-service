import { IUser } from '../../../types/IUser';

export class UserResponse implements Partial<IUser> {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}
