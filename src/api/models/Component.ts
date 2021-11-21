import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, Min, Validate } from 'class-validator';

import { OwnedEntity } from './base/OwnedEntity';
import { Color } from './Color';
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

  @ManyToOne(() => Color, { cascade: false, nullable: true })
  color?: Color;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
