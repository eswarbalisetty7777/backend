import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLineService } from './order-line.service';
import { OrderLineController } from './order-line.controller';
import { OrderLine } from './order-line.entity';
import { OrderModule } from 'src/order/order.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLine]),ItemModule,OrderLineModule,forwardRef(() => OrderModule),ItemModule], // Register the OrderLine entity with TypeORM
  providers: [OrderLineService],
  controllers: [OrderLineController],
  exports: [TypeOrmModule,OrderLineService], // Export TypeOrmModule if OrderLineRepository is needed in other modules
})
export class OrderLineModule {}
