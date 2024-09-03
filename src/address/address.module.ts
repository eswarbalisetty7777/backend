import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './address.entity';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]),
CustomerModule
], // Register the Address entity with TypeORM
  providers: [AddressService],
  controllers: [AddressController],
  exports: [TypeOrmModule,AddressService], // Export TypeOrmModule if AddressRepository is needed in other modules
})
export class AddressModule {}
