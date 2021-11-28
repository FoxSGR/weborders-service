import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IShoeOrder, ShoeSizes } from '../../types';
import { OwnedEntity } from './base/OwnedEntity';
import { ShoeSample } from './ShoeSample';
import { ShoeModel } from './ShoeModel';

@Entity()
export class ShoeOrder implements IShoeOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoeSample, { cascade: false })
  @JoinColumn()
  sample: ShoeSample;

  @ManyToOne(() => ShoeModel, { cascade: false, nullable: false })
  @JoinColumn()
  model: ShoeModel;

  @Column({ default: null })
  dateAsked?: Date;

  @Column({ default: null })
  dateDelivery?: Date;

  @Column({ default: '' })
  notes?: string;

  @Column({ default: '{}', type: 'simple-json' })
  sizes: ShoeSizes;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
