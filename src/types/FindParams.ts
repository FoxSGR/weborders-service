import { IsOptional, IsPositive, Matches } from 'class-validator';
import { IEntity } from './domain/IEntity';
import { IUser } from './domain/IUser';

export abstract class FindParams<T extends IEntity> {
  @IsOptional()
  owner: IUser;

  @IsOptional()
  sortField?: keyof T;

  @IsOptional()
  @Matches(/^(asc|desc)$/)
  sortDirection?: 'asc' | 'desc';

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number;
}
