import { IsNotEmpty } from 'class-validator';
import { IClient } from '../../types/IClient';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  @Column({ default: null })
  vat: string;

  @OneToOne(() => Address, { cascade: true })
  address: Address;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
