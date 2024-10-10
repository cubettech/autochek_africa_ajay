// src/user/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    default: UserType.USER,
  })
  type: string;
}
