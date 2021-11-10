import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IShoeModel } from '../../types';
import { OwnedEntity } from './base/OwnedEntity';
import { Brand } from './Brand';
import { Client } from './Client';
import { Component } from './Component';

@Entity()
export class ShoeModel implements IShoeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  reference?: string;

  @ManyToOne(() => Brand, { nullable: true })
  brand?: Brand;

  @ManyToOne(() => Client, { nullable: true })
  client?: Client;

  @ManyToMany(() => Component, { lazy: true })
  @JoinTable()
  components: Component[];

  @Column({ default: null })
  dateAsked?: Date;

  @Column({ default: null })
  dateDelivery?: Date;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
