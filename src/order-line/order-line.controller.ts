import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { OrderLineService } from './order-line.service';
import { CreateOrderLineDto, UpdateOrderLineDto } from './order-line.interface';
import { OrderLine } from './order-line.entity';

@Controller('orderlines')
export class OrderLineController {
    constructor(private readonly orderLineService: OrderLineService) {}

    @Get()
    async findAll(): Promise<OrderLine[]> {
        return this.orderLineService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<OrderLine> {
        const orderLine = await this.orderLineService.findOne(id);
        if (!orderLine) {
            throw new NotFoundException(`OrderLine with ID ${id} not found`);
        }
        return orderLine;
    }

    @Post()
    async create(@Body() createOrderLineDto: CreateOrderLineDto): Promise<OrderLine> {
        return this.orderLineService.create(createOrderLineDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateOrderLineDto: UpdateOrderLineDto
    ): Promise<OrderLine> {
        return this.orderLineService.update(id, updateOrderLineDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        await this.orderLineService.remove(id);
    }
}
