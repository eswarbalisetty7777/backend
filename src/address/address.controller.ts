import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.entity';
import { CreateAddressDto, UpdateAddressDto } from './address.interface';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  async findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.addressService.remove(id);
  }
}
