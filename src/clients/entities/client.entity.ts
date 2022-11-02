import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar', { length: 50 })
  name: string;

  @Column('nvarchar', { length: 50 })
  lastname: string;

  @Column('nvarchar', { length: 100 })
  email: string;

  @Column('nvarchar', { length: 20 })
  phone: string;

  @Column('nvarchar', { length: 220 })
  address: string;

  @Column('nvarchar', { length: 220 })
  city: string;

  @Column('int', { nullable: false })
  zip: number;

  @Column('bit', { nullable: false, default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
