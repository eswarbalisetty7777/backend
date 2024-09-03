import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderLine } from './order-line.entity';
import { CreateOrderLineDto, UpdateOrderLineDto } from './order-line.interface';
import { OrderService } from '../order/order.service';  // Import OrderService
import { ItemService } from '../item/item.service';     // Import ItemService

@Injectable()
export class OrderLineService {

    
    createOrderLineEntity(partialOrderLine: Partial<OrderLine>): OrderLine {
        return this.orderLineRepository.create(partialOrderLine);
    }
    createMany(orderLines: OrderLine[]) {
        return this.orderLineRepository.save(orderLines);

    }
    constructor(
        @InjectRepository(OrderLine)
        private readonly orderLineRepository: Repository<OrderLine>,
        @Inject(forwardRef(() => OrderService))
        private readonly orderService: OrderService,  // Inject OrderService
        private readonly itemService: ItemService,    // Inject ItemService
    ) { }

    async create(createOrderLineDto: CreateOrderLineDto): Promise<OrderLine> {
        const order = await this.orderService.findOne(createOrderLineDto.order_id);
        const item = await this.itemService.findOne(createOrderLineDto.item_id);

        const orderLine = this.orderLineRepository.create({
            order,
            item,
            quantity: createOrderLineDto.quantity,
        });

        return this.orderLineRepository.save(orderLine);
    }

    async findAll(): Promise<OrderLine[]> {
        return this.orderLineRepository.find({ relations: ['order', 'item'] });
    }

    async findOne(id: number): Promise<OrderLine> {
        const orderLine = await this.orderLineRepository.findOne({
            where: { order_line_id: id },
            relations: ['order', 'item'],
        });
        if (!orderLine) {
            throw new NotFoundException(`OrderLine with ID ${id} not found`);
        }
        return orderLine;
    }

    async update(id: number, updateOrderLineDto: UpdateOrderLineDto): Promise<OrderLine> {
        const orderLine = await this.findOne(id);

        if (updateOrderLineDto.order_id) {
            const order = await this.orderService.findOne(updateOrderLineDto.order_id);
            orderLine.order = order;
        }

        if (updateOrderLineDto.item_id) {
            const item = await this.itemService.findOne(updateOrderLineDto.item_id);
            orderLine.item = item;
        }

        if (updateOrderLineDto.quantity !== undefined) {
            orderLine.quantity = updateOrderLineDto.quantity;
        }

        return this.orderLineRepository.save(orderLine);
    }

    async remove(id: number): Promise<void> {
        const orderLine = await this.findOne(id);
        await this.orderLineRepository.remove(orderLine);
    }
}
