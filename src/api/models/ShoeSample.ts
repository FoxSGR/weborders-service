import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ShoeModel } from './ShoeModel';
import { Client } from './Client';
import { OwnedEntity } from './base/OwnedEntity';

@Entity()
export class ShoeSample {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoeModel, { cascade: false })
  baseModel: ShoeModel;

  @ManyToOne(() => Client, { cascade: false })
  client: Client;

  @Column({ default: null })
  dateAsked?: Date;

  @Column({ default: null })
  dateDelivery?: Date;

  @Column({ default: null })
  dateCreated?: Date;

  @Column({ default: null })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
