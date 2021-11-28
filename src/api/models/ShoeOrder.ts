import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IShoeOrder, ShoeSizes } from '../../types';
import { OwnedEntity } from './base/OwnedEntity';
import { ShoeSample } from './ShoeSample';

@Entity()
export class ShoeOrder implements IShoeOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ShoeSample, { cascade: false })
  @JoinColumn()
  sample: ShoeSample;

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
