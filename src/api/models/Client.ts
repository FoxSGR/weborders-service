import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { IClient } from '../../types';
import { OwnedEntity } from './base/OwnedEntity';
import { Address } from './Address';
import { Agent } from './Agent';

@Entity()
export class Client implements IClient {
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
  address: Address;

  @ManyToOne(() => Agent, { cascade: false })
  agent: Agent;

  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
