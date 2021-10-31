import { IEntity } from './IEntity';

export interface IUser extends IEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}
