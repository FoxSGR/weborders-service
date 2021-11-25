import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsString, Min } from 'class-validator';

import { IShoeModelComponent } from '../../types';
import { Component } from './Component';
import { ShoeModel } from './ShoeModel';
import { OwnedEntity } from './base/OwnedEntity';
import { Color } from './Color';

@Entity()
export class ShoeModelComponent implements IShoeModelComponent {
  @PrimaryColumn({ type: 'int', name: 'modelId' })
  @ManyToOne(() => ShoeModel, (model) => model.components)
  model: ShoeModel;

  @PrimaryColumn({ type: 'int', name: 'componentId' })
  @ManyToOne(() => Component, { cascade: false, eager: true })
  component: Component;

  @Min(0)
  @Column({ default: null })
  amount?: number;

  @Min(0)
  @Column({ default: null })
  price?: number;

  @ManyToOne(() => Color, { cascade: false, nullable: true, eager: true })
  @JoinColumn()
  color?: Color;

  @IsString()
  @Column({ default: '' })
  notes?: string;

  @Column(() => OwnedEntity, { prefix: '' })
  base: OwnedEntity;
}
