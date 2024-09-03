import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { CustomerModule } from './customer/customer.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { OrderLineModule } from './order-line/order-line.module';

// Import all your entities
import { Item } from './item/item.entity';
import { Customer } from './customer/customer.entity';
import { Address } from './address/address.entity';
import { Order } from './order/order.entity';
import { OrderLine } from './order-line/order-line.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '<YOUR DB USERNAME>',
      password: '<YOUR DB PASSWORD',
      database: 'DPWorld',
      entities: [Item, Customer, Address, Order, OrderLine],
      synchronize: true, // Set to true during development if you want auto schema sync
    }),
    ItemModule,
    CustomerModule,
    AddressModule,
     OrderModule, // Use forwardRef here as well
    OrderLineModule, // Use forwardRef here as well
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
