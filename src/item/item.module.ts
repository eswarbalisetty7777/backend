import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],  // Register the Item entity here
  providers: [ItemService],
  controllers: [ItemController],
  exports: [TypeOrmModule,ItemService],  // Export TypeOrmModule so that other modules can use ItemRepository
})
export class ItemModule {}
