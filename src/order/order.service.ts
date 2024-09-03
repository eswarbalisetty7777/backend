import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto } from './order.interface';
import { CustomerService } from '../customer/customer.service';
import { AddressService } from '../address/address.service';
import { OrderLineService } from '../order-line/order-line.service';
import { Address } from '../address/address.entity';
import { OrderLine } from '../order-line/order-line.entity';
import { v4 as uuidv4 } from 'uuid'; // You can use a package like uuid to generate unique strings, or create your own function

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customerService: CustomerService,
    private readonly addressService: AddressService,
    @Inject(forwardRef(() => OrderLineService))
    private readonly orderLineService: OrderLineService,
  ) {}


  async create(createOrderDto: CreateOrderDto): Promise<Order> {
      const customer = await this.customerService.findOne(createOrderDto.customer_id);
  
      let address: Address | null = null;
      if (createOrderDto.address_id) {
        address = await this.addressService.findOne(createOrderDto.address_id);
      }
  
      let referenceNum: string;
      let isExists = true;
  
      // Loop until a unique reference number is found
      while (isExists) {
          // Generate a random alphanumeric string
          referenceNum = this.generateRandomString(8); // Function to generate random string of length 8
          
          // Check if the generated reference number exists in the database
          isExists = await this.orderRepository.findOne({ where: { reference_num: referenceNum } }) !== null;
      }
  
      // Create the order object
      const order = this.orderRepository.create({
        customer,
        address,
        reference_num: referenceNum,
      });
  
      // Save the order
      const savedOrder = await this.orderRepository.save(order);
  
      // Assuming you have code to create order lines
      // const orderLines: OrderLine[] = createOrderDto.orderLines.map(line => {
      //   return this.orderLineService.createOrderLineEntity({
      //     ...line,
      //     order: savedOrder,
      //   });
      // });
  
      // await this.orderLineService.createMany(orderLines);
  
      return this.findOne(savedOrder.order_id);
  }

  
  
  // Function to generate a random alphanumeric string
  private generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
  
  
  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['customer', 'address', 'orderLines','orderLines.item'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
      relations: ['customer', 'address', 'orderLines','orderLines.item'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.customer_id) {
      const customer = await this.customerService.findOne(updateOrderDto.customer_id);
      order.customer = customer;
    }

    if (updateOrderDto.address_id) {
      const address = await this.addressService.findOne(updateOrderDto.address_id);
      order.address = address;
    }

    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
