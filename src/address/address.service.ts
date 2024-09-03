import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto, UpdateAddressDto } from './address.interface';
import { CustomerService } from '../customer/customer.service'; // Import CustomerService

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly customerService: CustomerService, // Inject CustomerService
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    // Use CustomerService to find the customer
    const customer = await this.customerService.findOne(createAddressDto.customer_id);
    
    const address = this.addressRepository.create({
      ...createAddressDto,
      customer,
    });

    return this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return this.addressRepository.find({ relations: ['customer'] });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { address_id: id },
      relations: ['customer'],
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id);
    
    if (updateAddressDto.customer_id) {
      // Use CustomerService to find the customer
      const customer = await this.customerService.findOne(updateAddressDto.customer_id);
      address.customer = customer;
    }

    Object.assign(address, updateAddressDto);
    return this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
