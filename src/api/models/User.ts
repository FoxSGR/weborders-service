import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './Client';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ name: 'first_name' })
  firstName: string;

  @IsNotEmpty()
  @Column({ name: 'last_name' })
  lastName: string;

  @IsNotEmpty()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Client, (client) => client.id)
  clients: Promise<Client[]>;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await User.hashPassword(this.password);
  }

  toString(): string {
    return `${this.firstName} ${this.lastName} (${this.email})`;
  }

  static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      void bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }
}
