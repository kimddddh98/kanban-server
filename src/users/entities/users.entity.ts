import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
