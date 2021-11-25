import {
  Column,
  Entity, JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ShoeModel } from './ShoeModel';
import { Client } from './Client';
import { OwnedEntity } from './base/OwnedEntity';
import { Agent } from './Agent';
import { IShoeSample } from '../../types';
import { Brand } from './Brand';

@Entity()
export class ShoeSample implements IShoeSample {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoeModel, { cascade: false })
  @JoinColumn()
  baseModel: ShoeModel;

  @OneToOne(() => ShoeModel, { cascade: true })
  @JoinColumn()
  sampleModel: ShoeModel;

  // TODO: ADD INVERSE SIDE
  @ManyToOne(() => Client, { cascade: false })
  @JoinColumn()
  client?: Client;

  @ManyToOne(() => Agent)
  @JoinColumn()
  agent?: Agent;

  @ManyToOne(() => Brand)
  @JoinColumn()
  brand?: Brand;

  @Column({ default: null })
  dateAsked?: Date;

  @Column({ default: null })
  dateDelivery?: Date;

  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
