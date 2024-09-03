import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from 'src/address/address.entity';
import { Order } from 'src/order/order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ unique: true })
  customer_code: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Address, (address) => address.customer)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
