import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findOne({
      where: { customer_code: createCustomerDto.customer_code },
    });
  
    if (existingCustomer) {
      const customerError = {
          message: `Customer with code ${createCustomerDto.customer_code} already exists.`,
          code: 'CUSTOMER_CODE_EXISTS'
      };
      throw new BadRequestException(customerError);
  }

  
   const customer = this.customerRepository.create(createCustomerDto);
    const savedCustomer = await this.customerRepository.save(customer);

    return { customer_id: savedCustomer.customer_id, ...savedCustomer };
  }
  

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['addresses', 'orders'] });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { customer_id: id },
      relations: ['addresses', 'orders'],
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    Object.assign(customer, updateCustomerDto);
    return this.customerRepository.save(customer);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }
}
