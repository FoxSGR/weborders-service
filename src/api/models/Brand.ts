import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IBrand } from '../../types/domain/IBrand';
import { OwnedEntity } from './base/OwnedEntity';
import { IsNotEmpty, IsString } from 'class-validator';

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
