import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as xml2js from 'xml2js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order/order.entity';
import { Customer } from './customer/customer.entity';
import { Address } from './address/address.entity';
import { OrderLine } from './order-line/order-line.entity';
import { Item } from './item/item.entity';
import * as path from 'path';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(OrderLine)
    private readonly orderLineRepository: Repository<OrderLine>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async processUploadedFile(filename: string): Promise<void> {
    try {
      const uploadsDir = path.join(process.cwd(), 'uploads'); // Points to ./uploads in the project root
      const filePath = path.join(uploadsDir, filename);

      if (!fs.existsSync(filePath)) {
        throw new NotFoundException(`File ${filename} not found in uploads directory.`);
      }

      const xmlData = fs.readFileSync(filePath, 'utf8');

      // Parse the XML data to JSON
      const parser = new xml2js.Parser({ explicitArray: false });
      const result = await parser.parseStringPromise(xmlData);

      // Extract orders from the parsed JSON
      const orders = result.TransactionRequest?.Orders?.Order;

      if (!orders || !Array.isArray(orders)) {
        throw new InternalServerErrorException('Invalid XML structure: No orders found.');
      }

      for (const orderData of orders) {
        // Process Customer
        const customerData = orderData.Customer;
        if (!customerData) {
          throw new InternalServerErrorException('Invalid XML structure: Missing customer data.');
        }

        let customer = await this.customerRepository.findOne({ where: { customer_code: customerData.CustomerCode } });
        if (!customer) {
          customer = this.customerRepository.create({
            customer_code: customerData.CustomerCode,
            first_name: customerData.FirstName,
            last_name: customerData.LastName,
            phone: customerData.Phone,
            email: customerData.Email,
          });
          await this.customerRepository.save(customer);
        }

        // Process Address
        const addressData = orderData.Address;
        if (!addressData) {
          throw new InternalServerErrorException('Invalid XML structure: Missing address data.');
        }

        const address = this.addressRepository.create({
          customer,
          address_type: addressData.AddressType,
          address_line1: addressData.AddressLine1,
          address_line2: addressData.AddressLine2,
          country_code: orderData.CountryCode,
        });
        await this.addressRepository.save(address);

        // Process Order
        const order = this.orderRepository.create({
          reference_num: orderData.ReferenceNum,
          customer,
          address,
        });
        await this.orderRepository.save(order);

        // Process OrderLines
        const orderLinesData = orderData.OrderLines?.OrderLine;
        if (!orderLinesData || (Array.isArray(orderLinesData) && orderLinesData.length === 0)) {
          throw new InternalServerErrorException('Invalid XML structure: No order lines found.');
        }

        for (const lineData of Array.isArray(orderLinesData) ? orderLinesData : [orderLinesData]) {
          let item = await this.itemRepository.findOne({ where: { item_num: lineData.ItemNum } });
          if (!item) {
            // If the item doesn't exist, create a new item
            item = this.itemRepository.create({
              item_num: lineData.ItemNum,
              item_description: lineData.ItemDescription,
              // Add other fields as necessary
            });

            // Save the new item to the database
            await this.itemRepository.save(item);
          }
          try {
            const orderLine = this.orderLineRepository.create({
              order,
              item,
              quantity: 1, // Assuming quantity is 1 as it's not provided in the XML
            });
          
            await this.orderLineRepository.save(orderLine);
          } catch (error) {
            // Handle the error appropriately
            console.error('Error saving OrderLine:', error.message);
          
            // Optionally, you can rethrow the error or throw a new custom error
            throw new Error('Failed to create and save OrderLine');
          }
        }
      }
    } catch (error) {
      // Log the error and rethrow it for higher-level handling
      console.error('Error processing uploaded file:', error.message);
      throw new InternalServerErrorException(`Error processing file ${filename}: ${error.message}`);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
