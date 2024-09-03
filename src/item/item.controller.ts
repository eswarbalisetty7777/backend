import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Item } from './item.entity';
import { CreateItemDto, UpdateItemDto } from './item.interface';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.itemService.remove(id);
  }
}
