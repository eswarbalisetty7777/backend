import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.interface';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.customerService.remove(id);
  }
}
