import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IShoeModel } from '../../types';
import { OwnedEntity } from './base/OwnedEntity';
import { Component } from './Component';

@Entity()
@Unique(['reference', 'base.owner'])
export class ShoeModel implements IShoeModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  reference?: string;

  @ManyToMany(() => Component, { lazy: true })
  @JoinTable()
  components: Component[];

  @Column({ default: null })
  dateAsked?: Date;

  @Column({ default: null })
  dateDelivery?: Date;

  @Column({ default: null })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
