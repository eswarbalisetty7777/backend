import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto, UpdateItemDto } from './item.interface';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    // Check if an item with the same item_num and item_description already exists
    const existingItem = await this.itemRepository.findOne({
      where: {
        item_num: createItemDto.item_num,
        item_description: createItemDto.item_description,
      },
    });

    if (existingItem) {
      throw new BadRequestException({
        message: 'Item with the same item_num and item_description already exists.',
        code: 'ITEM_EXISTS'
      });
    }

    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ['orderLines'] });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { item_id: id },
      relations: ['orderLines'],
    });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    Object.assign(item, updateItemDto);
    return this.itemRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
  }
}
