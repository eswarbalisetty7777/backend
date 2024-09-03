import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { AddressModule } from 'src/address/address.module';
import { OrderLineModule } from 'src/order-line/order-line.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),CustomerModule,AddressModule,forwardRef(() => OrderLineModule)], // Register the Order entity with TypeORM
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService,TypeOrmModule], // Export TypeOrmModule if OrderRepository is needed in other modules
})
export class OrderModule {}
