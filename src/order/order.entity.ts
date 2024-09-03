import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Address } from '../address/address.entity';
import { OrderLine } from 'src/order-line/order-line.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  // @Index() // Create an index on the reference_num column
  @Column({ unique: true, nullable: false }) // Ensure the column is unique and non-null
  reference_num: string;

  @ManyToOne(() => Customer, (customer) => customer.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })  // Explicitly set the column name to 'customer_id'
  customer: Customer;

  @ManyToOne(() => Address, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'address_id' })  // Explicitly set the column name to 'address_id'
  address: Address;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
