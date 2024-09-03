  import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
  import { Order } from '../order/order.entity';
  import { Item } from '../item/item.entity';

  @Entity()
  export class OrderLine {
    @PrimaryGeneratedColumn()
    order_line_id: number;

    @ManyToOne(() => Order, (order) => order.orderLines, { onDelete: 'CASCADE' })
    order: Order;

    @ManyToOne(() => Item, (item) => item.orderLines, { onDelete: 'CASCADE' })
    item: Item;

    @Column()
    quantity: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }
