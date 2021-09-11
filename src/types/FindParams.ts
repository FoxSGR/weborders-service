import { IsPositive, Matches } from 'class-validator';
import { IEntity } from './IEntity';

export abstract class FindParams<T extends IEntity> {
  sortField?: keyof T;

  @Matches(/^(asc|desc)$/)
  sortDirection?: 'asc' | 'desc';

  @IsPositive()
  limit?: number;

  @IsPositive()
  offset?: number;
}
