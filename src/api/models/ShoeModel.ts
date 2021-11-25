import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Validate } from 'class-validator';

import { IPhoto, IShoeModel, ShoeModelType, shoeModelTypes } from '../../types';
import { OwnedEntity } from './base/OwnedEntity';
import { ShoeModelComponent } from './ShoeModelComponent';
import { Season } from './Season';

@Entity()
@Unique(['reference', 'owner', 'type'])
export class ShoeModel implements IShoeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Validate((type) => shoeModelTypes.includes(type))
  @Column({ type: 'enum', enum: shoeModelTypes })
  type: ShoeModelType;

  @Column({ default: null })
  reference?: string;

  @Column({ default: '[]', type: 'simple-json' })
  photos: IPhoto[];

  @OneToMany(() => ShoeModelComponent, (component) => component.model, {
    cascade: true,
  })
  @JoinTable()
  components: ShoeModelComponent[];

  @Column({ default: null })
  dateCreated?: Date;

  @Column(() => Season)
  season: Season;

  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
