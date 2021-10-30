import { IsNotEmpty } from 'class-validator';
import { IClient } from '../../types/IClient';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';
import { EntityBase } from './EntityBase';

@Entity()
export class Client implements IClient {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  vat: string;

  @OneToOne(() => Address, { cascade: true })
  address: Address;

  @Column(() => EntityBase, { prefix: '' })
  base: EntityBase;
}
