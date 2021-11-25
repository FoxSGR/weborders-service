import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IAgent } from '../../types';
import { OwnedEntity } from './base/OwnedEntity';
import { Address } from './Address';
import { Client } from './Client';

@Entity()
export class Agent implements IAgent {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Column({ default: null })
  phoneNumber?: string;

  @Column({ default: null })
  vat?: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address?: Address;

  // not persisted
  clients?: Client[];

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
