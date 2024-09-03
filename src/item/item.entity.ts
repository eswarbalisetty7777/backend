import { OrderLine } from 'src/order-line/order-line.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column({ unique: true })
  item_num: string;

  @Column()
  item_description: string;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.item)
  orderLines: OrderLine[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
