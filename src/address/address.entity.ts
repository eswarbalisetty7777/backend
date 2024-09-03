import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  address_id: number;

  @ManyToOne(() => Customer, (customer) => customer.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })  
  customer: Customer;

  @Column({ default: 'home' })
  address_type: string;

  @Column()
  address_line1: string;

  @Column({ nullable: true })
  address_line2: string;

  @Column()
  country_code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
