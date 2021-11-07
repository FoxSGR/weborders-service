import { ManyToOne } from 'typeorm';
import { User } from '../User';
import { EntityBase } from './EntityBase';

export class OwnedEntity extends EntityBase {
  @ManyToOne(() => User, { cascade: false })
  owner: User;
}
