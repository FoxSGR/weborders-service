import { DeepPartial } from 'typeorm';

export * from './FindParams';
export * from './Page';
export * from './domain/roles';
export * from './domain/IAddress';
export * from './domain/IAgent';
export * from './domain/IBrand';
export * from './domain/IClient';
export * from './domain/IComponent';
export * from './domain/IColor';
export * from './domain/IEntity';
export * from './domain/IPhoto';
export * from './domain/ISeason';
export * from './domain/IShoeModel';
export * from './domain/IShoeModelComponent';
export * from './domain/IShoeSample';
export * from './domain/IUser';

export type Promial<T> = Promise<DeepPartial<T>>;
export type ResponseType = 'simple' | 'full';
