import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import { IBrand } from '../../types';
import { OwnedEntity } from './base/OwnedEntity';

@Entity()
export class Brand implements IBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
