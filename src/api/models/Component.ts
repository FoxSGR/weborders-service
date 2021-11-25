import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, Min, Validate } from 'class-validator';

import { OwnedEntity } from './base/OwnedEntity';
import { ComponentType, componentTypes, IComponent } from '../../types';

@Entity()
export class Component implements IComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Validate((type) => componentTypes.includes(type))
  @Column({ type: 'enum', enum: componentTypes })
  type: ComponentType;

  @IsNotEmpty()
  @Column()
  name: string;

  @Min(0)
  @Column({ default: null })
  amount?: number;

  @Min(0)
  @Column({ default: null })
  price?: number;

  @IsString()
  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
