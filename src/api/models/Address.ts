import { Validate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { countries } from './countries';
import { EntityBase } from './EntityBase';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: undefined })
  line1: string;

  @Column({ default: undefined })
  line2: string;

  @Column({ default: undefined })
  city: string;

  @Column({ default: undefined })
  zipCode: string;

  @Column({ default: undefined })
  @Validate((country: string) => (country ? !!countries[country] : true))
  country: string;

  @Column(() => EntityBase, { prefix: '' })
  base: EntityBase;
}
