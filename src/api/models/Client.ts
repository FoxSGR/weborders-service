import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IClient } from '../../types';
import { Address } from './Address';
import { OwnedEntity } from './base/OwnedEntity';

@Entity()
export class Client implements IClient {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Column({ default: null })
  phoneNumber: string;

  @Column({ default: null })
  vat: string;

  @OneToOne(() => Address, { cascade: true })
  address: Address;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
